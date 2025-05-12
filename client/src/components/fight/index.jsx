import React from "react";

import { getFighters } from "../../services/domainRequest/fightersRequest";
import NewFighter from "../newFighter";
import Fighter from "../fighter";
import { Button } from "@material-ui/core";
import { createFight } from "../../services/domainRequest/fightRequest";
import "./fight.css";

class Fight extends React.Component {
  state = {
    fighters: [],
    fighter1: null,
    fighter2: null,
    fightLog: [],
    winnerId: null,
  };

  async componentDidMount() {
    const fighters = await getFighters();
    if (fighters && !fighters.error) {
      this.setState({ fighters });
    }
  }

  onFightStart = async () => {
    const { fighter1, fighter2 } = this.state;

    if (!fighter1 || !fighter2) {
      alert("Виберіть обох бійців");
      return;
    }

    const fight = await createFight({
      fighter1Id: fighter1.id,
      fighter2Id: fighter2.id,
    });

    if (!fight.error) {
      this.setState({
        fightLog: fight.log,
        winnerId: fight.winner,
      });
    } else {
      alert("Помилка бою: " + fight.message);
    }
  };

  onCreate = (fighter) => {
    this.setState({ fighters: [...this.state.fighters, fighter] });
  };

  onFighter1Select = (fighter1) => {
    this.setState({ fighter1 });
  };

  onFighter2Select = (fighter2) => {
    this.setState({ fighter2 });
  };

  getFighter1List = () => {
    const { fighter2, fighters } = this.state;
    return !fighter2 ? fighters : fighters.filter((f) => f.id !== fighter2.id);
  };

  getFighter2List = () => {
    const { fighter1, fighters } = this.state;
    return !fighter1 ? fighters : fighters.filter((f) => f.id !== fighter1.id);
  };

  renderLog = () => {
    return this.state.fightLog.map((round, index) => (
      <div key={index}>
        <strong>Раунд {index + 1}:</strong>
        <span>
          {" "}
          {round.fighter1Shot} урону → {round.fighter2Shot} урону |
        </span>
        <span>
          {" "}
          Здоров'я: {round.fighter1Health} - {round.fighter2Health}
        </span>
      </div>
    ));
  };

  renderWinner = () => {
    const { winnerId, fighters } = this.state;
    if (!winnerId) return null;
    const winner = fighters.find((f) => f.id === winnerId);
    return (
      <div className="winner-box">
        🏆 Переможець: <strong>{winner?.name || "Невідомий"}</strong>
      </div>
    );
  };

  render() {
    const { fighter1, fighter2 } = this.state;

    return (
      <div id="wrapper">
        <NewFighter onCreated={this.onCreate} />

        <div id="figh-wrapper">
          <Fighter
            selectedFighter={fighter1}
            onFighterSelect={this.onFighter1Select}
            fightersList={this.getFighter1List()}
          />

          <div className="btn-wrapper">
            <Button
              onClick={this.onFightStart}
              variant="contained"
              color="primary"
            >
              Start Fight
            </Button>
          </div>

          <Fighter
            selectedFighter={fighter2}
            onFighterSelect={this.onFighter2Select}
            fightersList={this.getFighter2List()}
          />
        </div>

        <div className="fight-log">
          {this.renderWinner()}
          {this.renderLog()}
        </div>
      </div>
    );
  }
}

export default Fight;
