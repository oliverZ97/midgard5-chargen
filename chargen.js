const readline = require("readline");
const fs = require("fs");
var character = {};

function startgen() {
  chooseGender();
}

function chooseGender() {
  console.log("WELCOME TO");
  console.log(
    " ________   __     __     ______     ______     _______   ________   ___    __     _    _       __"
  );
  console.log(
    "/ _______| |  |   |  |   |  __  |   |   _  \\   |  _____| |  ______| |   \\  |  |   | \\__/ |     / _\\"
  );
  console.log(
    "| |        |  |___|  |  |  |__|  |  |  |_|  |  | |  ___  | |_____   | |\\ \\ |  |   |  __  |    /  \\"
  );
  console.log(
    "| |        |   ___   |  |  ____  |  |      /   | | |__ | |  _____|  | | \\ \\|  |   |_/||\\_|   /    \\"
  );
  console.log(
    "| |______  |  |   |  | |  |    |  | |  |\\  \\   | |___| | | |______  | |  \\ \\  |      ||     /      \\"
  );
  console.log(
    "\\________| |__|   |__| |__|    |__| |__| \\__\\  \\_______/ |________| |_|   \\___|      ||  __/________\\__"
  );

  console.log(
    "**********************************************************************************************************************"
  );
  console.log("Created by Oliver Ziemann | 2020 | Version 1.0.2");
  console.log(
    "This tool is used to create a Character based on the Rules of MIDGARD 5. "
  );
  console.log(
    "**********************************************************************************************************************"
  );
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let gender = "";
  rl.question(
    "First of all should your character be male or female or diverse? ",
    (answer) => {
      if (answer === "") {
        gender = "male";
      } else {
        gender = answer;
      }

      rl.question(
        "So your character will be " +
          gender +
          ". Is that correct? If not please correct your Answer here, else press just enter. ",
        (answer) => {
          if (answer !== "") {
            gender = answer;
          }
          character.gender = gender;
          console.log(`So your character is ${gender}.`);
          console.log(
            "**********************************************************************************************************************"
          );
          chooseName(rl);
        }
      );
    }
  );
}

function chooseName(rl) {
  let name = "";
  rl.question(
    "In the next step, you have to choose a name for your character. What name should it be? ",
    (answer) => {
      if (answer === "") {
        name = "John McCormack";
      } else {
        name = answer;
      }
      rl.question(`So the name is ${name}? `, (answer) => {
        if (answer === "no") {
          rl.question(
            "Please choose a name for your character. What name should it be? ",
            (answer) => {
              name = answer;
            }
          );
        }
        character.name = name;
        console.log(
          "**********************************************************************************************************************"
        );
        chooseRace(rl);
      });
    }
  );
}

function setCharacteristics(rl) {
  let height = "";
  let stature = "";
  let age = 18;
  let whand = "right";
  console.log(
    "Now the height, stature, age and the weaponhand of the character are choosen. If you want a random value to be choosen, just press enter."
  );
  rl.question(
    "Please choose the height of the character. Type the value in cm. ",
    (answer) => {
      switch (character.race) {
        case "human":
          if (answer === "") {
            height = Math.round(Math.random() * 60 + 150);
          } else {
            if (answer < 150) {
              height = 150;
            } else if (answer > 210) {
              height = 210;
            } else {
              height = answer;
            }
          }
          break;
        case "elf":
          if (answer === "") {
            height = Math.round(Math.random() * 50 + 165);
          } else {
            if (answer < 166) {
              height = 166;
            } else if (answer > 210) {
              height = 210;
            } else {
              height = answer;
            }
          }
          break;
        case "dwarf":
          if (answer === "") {
            height = Math.round(Math.random() * 15 + 132);
          } else {
            if (answer < 132) {
              height = 132;
            } else if (answer > 146) {
              height = 146;
            } else {
              height = answer;
            }
          }
          break;
        case "halfling":
          if (answer === "") {
            height = Math.round(Math.random() * 20 + 103);
          } else {
            if (answer < 103) {
              height = 103;
            } else if (answer > 122) {
              height = 122;
            } else {
              height = answer;
            }
          }
          break;
        case "gnome":
          if (answer === "") {
            height = Math.round(Math.random() * 15 + 92);
          } else {
            if (answer < 92) {
              height = 92;
            } else if (answer > 106) {
              height = 106;
            } else {
              height = answer;
            }
          }
      }

      character.height = height;
      console.log(`Your character has a height of ${height}cm.`);

      rl.question(
        "Now choose the stature of your character. You can choose between slim, normal and if not an elf - wide. ",
        (answer) => {
          if (character.race === "elf") {
            if (answer === "") {
              let rdm = Math.round(Math.random() * 2);
              switch (rdm) {
                case 1:
                  stature = "slim";
                  break;
                case 2:
                  stature = "normal";
                  break;
                default:
                  stature = "slim";
              }
            } else {
              stature = answer;
            }
          } else {
            if (answer === "") {
              let rdm = Math.round(Math.random() * 3);
              switch (rdm) {
                case 1:
                  stature = "slim";
                  break;
                case 2:
                  stature = "normal";
                  break;
                case 3:
                  stature = "wide";
                  break;
                default:
                  stature = "normal";
              }
            } else {
              stature = answer;
            }
          }

          character.stature = stature;
          console.log(`Your character's stature is ${stature}.`);

          rl.question(
            "Now choose the age of your character. It should be at least 16 years. ",
            (answer) => {
              if (answer === "") {
                let rdm = Math.round(Math.random() * 12 + 16);
                age = rdm;
              } else {
                age = answer;
              }
              if (character.race === "elf") {
                age = age * 5;
              }
              if (character.race === "dwarf") {
                age = age * 2;
              }
              if (character.race === "gnome") {
                age = age * 4;
              }
              character.age = age;
              console.log(`Your character's age is ${age}.`);
              let rdm = Math.round(Math.random() * 100 + 1);
              if (character.race === "gnome") {
                whand = "B";
              } else {
                if (rdm <= 75) {
                  whand = "R";
                } else if (rdm <= 95) {
                  whand = "L";
                } else {
                  whand = "B";
                }
              }
              character.whand = whand;
              console.log(`Your weaponhand is ${character.whand}.`);
              console.log(
                "**********************************************************************************************************************"
              );
              let counter = 2;
              setSkills(rl, counter);
            }
          );
        }
      );
    }
  );
}

function chooseRace(rl) {
  let race = "";
  rl.question(
    "You can decide which Race your character should have. Your character could be a human, an elf, a dwarf, a halfling or a gnome. ",
    (answer) => {
      if (answer === "") {
        let rdm = Math.round(Math.random() * 5);
        switch (rdm) {
          case 1:
            race = "human";
            break;
          case 2:
            race = "elf";
            break;
          case 3:
            race = "dwarf";
            break;
          case 4:
            race = "halfling";
            break;
          case 5:
            race = "gnome";
            break;
          default:
            race = "human";
        }
      } else {
        race = answer;
      }
      character.race = race;
      console.log(`Your character's race is ${race}.`);
      console.log(
        "**********************************************************************************************************************"
      );
      setCharacteristics(rl);
    }
  );
}

function setSkills(rl, counter) {
  let c = counter;
  let st = 0;
  let gs = 0;
  let gw = 0;
  let ko = 0;
  let wi = 0;
  let zt = 0;
  console.log("In this step the basic skills are setted.");
  st = Math.round(Math.min(Math.random() * 100 + 1, 100));
  gs = Math.round(Math.min(Math.random() * 100 + 1, 100));
  gw = Math.round(Math.min(Math.random() * 100 + 1, 100));
  ko = Math.round(Math.min(Math.random() * 100 + 1, 100));
  wi = Math.round(Math.min(Math.random() * 100 + 1, 100));
  zt = Math.round(Math.min(Math.random() * 100 + 1, 100));
  switch (character.race) {
    case "Elf":
      if (st > 90) {
        st = 90;
      }
      if (gw < 81) {
        gw = 81;
      }
      if (ko < 51) {
        ko = 51;
      }
      if (wi < 51) {
        wi = 51;
      }
      if (zt < 51) {
        zt = 51;
      }
      break;
    case "dwarf":
      if (st < 61) {
        st = 61;
      }
      if (ko < 61) {
        ko = 61;
      }
      if (gw > 80) {
        gw = 80;
      }
      break;
    case "halfling":
      if (st > 80) {
        st = 80;
      }
      if (gs < 61) {
        gs = 61;
      }
      if (gw < 91) {
        gw = 91;
      }
      if (ko < 41) {
        ko = 41;
      }
      break;
    case "gnome":
      if (st > 60) {
        st = 60;
      }
      if (gs < 81) {
        gs = 81;
      }
      if (gw < 81) {
        gw = 81;
      }
      if (ko < 51) {
        ko = 51;
      }
      break;
  }
  console.log("-------------------------");
  console.log("STRENGTH: ", st);
  console.log("DEXTERITY: ", gs);
  console.log("AGILITY: ", gw);
  console.log("FITNESS: ", ko);
  console.log("INTELLIGENCE: ", wi);
  console.log("MAGICAL TALENT: ", zt);
  console.log("-------------------------");
  rl.question(
    "Are you okay with that? Type r to repeat. You can repeat " +
      c +
      " time/s ",
    (answer) => {
      if (answer === "r" && c !== 0) {
        c--;
        setSkills(rl, c);
      } else {
        character.st = st;
        character.gs = gs;
        character.gw = gw;
        character.ko = ko;
        character.wi = wi;
        character.zt = zt;
        console.log(
          "**********************************************************************************************************************"
        );
        setMoreSkills(rl);
      }
    }
  );
}

function setMoreSkills(rl) {
  console.log("Now some more Properties of the character are placed.");
  let au = 0;
  let pa = 0;
  let wk = 0;
  au = Math.round(Math.random() * 100 + 1);
  pa = Math.round(Math.random() * 100 + 1 + 4 * (character.wi / 10) - 20);
  wk = Math.round(
    Math.random() * 100 + 1 + 2 * (character.ko / 10 + character.wi / 10) - 20
  );
  switch (character.race) {
    case "elf":
      if (au < 81) {
        au = 81;
      }
      break;
    case "dwarf":
      if (au > 80) {
        au = 80;
      }
      break;
    case "gnome":
      if (au > 80) {
        au = 80;
      }
      break;
  }
  console.log("-------------------------");
  console.log("APPEARENCE: ", au);
  console.log("CHARISMA: ", pa);
  console.log("WILL POWER: ", wk);
  console.log("-------------------------");
  character.au = au;
  character.pa = pa;
  character.wk = wk;
  console.log(
    "**********************************************************************************************************************"
  );
  chooseClass(rl);
}

function chooseClass(rl) {
  let adClass = "";
  let clType = "";
  console.log(
    "Now you have to choose your adventure-class. There are three types of classes. Warriors, Magicians and magical Warriors.\nA list of the different classes is below:"
  );
  console.log("--------------------------------------------------------");
  console.log("Warriors               mag. Warriors       Wizards      ");
  console.log("--------------------------------------------------------");
  console.log("Assasin(As)            Bard(Ba)            Druid(Dr)");
  console.log("Barbarian(Bb)          Warrior(Order)(Or)  Warlock(Hx)");
  console.log("Knight(Fortune)(Gl)                        Magician(Ma)");
  console.log("Trader(Hä)                                 Priest(PB)");
  console.log("Warrior(Kr)                                Priest(PS)");
  console.log("Rogue(Sp)                                  Shaman(Sc)");
  console.log("Ranger(Wa)");
  console.log("--------------------------------------------------------");
  console.log(
    `Your character is a ${character.race}. Depending on your race the choice of your class is limited. \nOnly as a human you are allowed to choose every class.`
  );
  switch (character.race) {
    case "elf":
      console.log("Please choose between the following classes: ");
      console.log("-------------------------");
      console.log("Gl, Kr, Wa, Ba, Dr, Hx, Ma");
      console.log("-------------------------");
      break;
    case "dwarf":
      console.log("Please choose between the following classes: ");
      console.log("-------------------------");
      console.log("Hä, Kr, Ma, PB, PS");
      console.log("-------------------------");
      break;
    case "halfling":
      console.log("Please choose between the following classes: ");
      console.log("-------------------------");
      console.log("As, Hä, Sp, Wa, Ba, PB");
      console.log("-------------------------");
      break;
    case "gnome":
      console.log("Please choose between the following classes: ");
      console.log("-------------------------");
      console.log("As, Gl, Sp, Wa, Dr, Hx, Ma");
      console.log("-------------------------");
      break;
  }
  rl.question("Which class do you choose? Type in the Shortcut. ", (answer) => {
    if (answer !== "") {
      console.log(`Congratulations! Your character is now a (${answer}).`);
      adClass = answer;
      if (
        adClass === "As" ||
        adClass === "Bb" ||
        adClass === "Gl" ||
        adClass === "Hä" ||
        adClass === "Kr" ||
        adClass === "Sp" ||
        adClass === "Wa"
      ) {
        clType = "Warrior";
      } else if (adClass === "Ba" || adClass === "Or") {
        clType = "maWarrior";
      } else {
        clType = "Wizard";
      }
    } else {
      switch (character.race) {
        case "human":
          adClass = "Kr";
          clType = "Warrior";
          break;
        case "elf":
          adClass = "Kr";
          clType = "Warrior";
          break;
        case "dwarf":
          adClass = "Kr";
          clType = "Warrior";
          break;
        case "halfling":
          adClass = "Hä";
          clType = "Warrior";
          break;
        case "gnome":
          adClass = "As";
          clType = "Warrior";
          break;
      }
    }
    console.log(`You choose ${adClass} to be your characters class.`);
    character.class = adClass;
    character.clType = clType;
    console.log(
      "**********************************************************************************************************************"
    );
    setState(rl);
  });
}

function setState(rl) {
  console.log(
    "Your character need to be part of a social enviroment. \nHe can be part of the Slaves, the social lower class, social middle class or the aristocracy. \nThe social enviroment depends partly on the class of the character."
  );
  let rdm = Math.round(Math.random() * 100 + 1);
  console.log(rdm);
  let status = "";

  if (
    character.class === "Ba" ||
    character.class === "PB" ||
    character.class === "PS"
  ) {
    rdm = rdm + 20;
  }
  if (character.class === "Dr" || character.class === "Ma") {
    rdm = rdm + 10;
  }
  if (
    character.class === "As" ||
    character.class === "Hä" ||
    character.class === "Wa"
  ) {
    rdm = rdm - 10;
  }
  if (character.class === "Sp") {
    rdm = rdm - 20;
  }

  if (rdm > 100) {
    rdm = 100;
  }
  if (rdm <= 10) {
    status = "Unfree People";
  }
  if (rdm > 10) {
    status = "Lower Class";
  }
  if (rdm > 50) {
    status = "Middle Class";
  }
  if (rdm > 90) {
    status = "Aristocracy";
  }

  console.log(`Your character is part of the ${status}`);
  character.status = status;
  console.log(
    "**********************************************************************************************************************"
  );
  chooseRank(rl);
}

function chooseRank(rl) {
  let rank = 0;
  console.log(
    "Great! Most of the main information of your character have been added. \nNow your Rank is choosen. Futhermore Lifepoints and Endurancepoints are calculated."
  );
  rl.question(
    "If your character should have Rank 1 just type Enter. ",
    (answer) => {
      console.log("-------------------------");
      if (answer === "") {
        rank = 1;
        character.rank = rank;
        console.log(
          `Your (${character.class}) ${character.name} has rank ${character.rank}.`
        );
        console.log(
          "**********************************************************************************************************************"
        );
        calculateLPAP(rl);
      } else {
        if (isNaN(answer)) {
          console.log(
            "Sorry, but your input seems to be not a number. Please check your input again."
          );
          chooseRank(rl);
        } else {
          rank = answer;
          character.rank = rank;
          console.log(
            `Your (${character.class}) ${character.name} has rank ${character.rank}.`
          );
          console.log(
            "**********************************************************************************************************************"
          );
          calculateLPAP(rl);
        }
      }
    }
  );
}

function calculateLPAP(rl) {
  let ab = Math.round(character.ko / 10 + character.st / 20);
  let lp = Math.round(Math.random() * 3 + 1 + 7 + character.ko / 10);
  let ap = Math.round(Math.random() * 3 + 1 + 1 + ab);
  switch (character.race) {
    case "Dwarf":
      lp = lp + 1;
      break;
    case "Halfling":
      lp = lp - 2;
      break;
    case "Gnome":
      lp = lp - 3;
      break;
  }
  if (
    character.class === "Bb" ||
    character.class === "Kr" ||
    character.class === "Wa"
  ) {
    ap = ap + 2;
  }
  if (
    character.class === "As" ||
    character.class === "Gl" ||
    character.class === "Hä" ||
    character.class === "Sp" ||
    character.class === "Ba" ||
    character.class === "Or" ||
    character.class === "Sc"
  ) {
    ap = ap + 1;
  }
  for (let i = 0; i < character.rank; i++) {
    if (character.rank < 6) {
      if (
        character.class === "Bb" ||
        character.class === "Kr" ||
        character.class === "Wa"
      ) {
        ap = ap + Math.round(Math.random() * 3 + 1 + 3);
      } else if (
        character.class === "As" ||
        character.class === "Gl" ||
        character.class === "Hä" ||
        character.class === "Sp" ||
        character.class === "Ba" ||
        character.class === "Or" ||
        character.class === "Sc"
      ) {
        ap = ap + Math.round(Math.random() * 3 + 1 + 2);
      } else {
        ap = ap + Math.round(Math.random() * 3 + 1 + 1);
      }
    } else {
      ap = ap + Math.round(Math.random() * 3 + 1);
    }
  }
  character.ap = ap;
  character.lp = lp;
  character.ab = ab;
  console.log("Your character has: ");
  console.log(`LIFEPOINTS: ${character.lp}`);
  console.log(`ENDURANCEPOINTS: ${character.ap}`);
  console.log(
    "**********************************************************************************************************************"
  );
  calculateBoni(rl);
}

function calculateBoni(rl) {
  let schb = Math.floor(character.st / 20 + character.gs / 30 - 3);
  let b = 0;
  let anb = 0;
  let abb = 0;
  let zaub = 0;
  switch (character.race) {
    case "Dwarf":
      b =
        Math.floor(
          Math.random() * 3 +
            1 +
            (Math.random() * 3 + 1) +
            (Math.random() * 3 + 1)
        ) + 12;
      break;
    case "Halfling":
      b = Math.floor(Math.random() * 3 + 1 + (Math.random() * 3 + 1)) + 8;
      break;
    case "Gnome":
      b = Math.floor(Math.random() * 3 + 1 + (Math.random() * 3 + 1)) + 8;
      break;
    default:
      b =
        Math.floor(
          Math.random() * 3 +
            1 +
            (Math.random() * 3 + 1) +
            (Math.random() * 3 + 1) +
            (Math.random() * 3 + 1)
        ) + 16;
  }
  anb = calcBonusValue(character.gs);
  abb = calcBonusValue(character.gw);
  zaub = calcBonusValue(character.zt);
  character.b = b;
  character.schb = schb;
  character.anb = anb;
  character.abb = abb;
  character.zaub = zaub;
  calcResB(rl);
}

function calcBonusValue(value) {
  let prop = 0;
  if (value > 0) {
    prop = -2;
  } else if (value > 5) {
    prop = -1;
  } else if (value > 20) {
    prop = 0;
  } else if (value > 80) {
    prop = +1;
  } else if (value > 95) {
    prop = +2;
  }
  return prop;
}

function calcResB(rl) {
  let g = 0;
  let k = 0;
  if (character.race === "Human") {
    g = calcBonusValue(character.wi);
    k = calcBonusValue(character.ko);
  } else {
    switch (character.race) {
      case "Elf":
        g = 2;
        k = 2;
        break;
      case "Dwarf":
        g = 3;
        k = 3;
        break;
      case "Halfling":
        g = 4;
        k = 4;
        break;
      case "Gnome":
        g = 4;
        k = 4;
        break;
    }
  }
  if (character.clType === "Wizard") {
    g += 2;
    k += 2;
  }
  if (character.clType === "Warrior") {
    k += 1;
  }
  character.resbg = g;
  character.resbk = k;
  chooseAbilities(rl);
}

function chooseAbilities(rl) {
  let bashing = Math.floor((character.st + character.gw) / 20 + character.anb);
  if (character.race === "Dwarf") {
    bashing += 1;
  }
  let drinking = Math.floor(character.ko / 10);
  let recognition = 6;
  character.bashing = bashing;
  character.drinking = drinking;
  character.recognition = recognition;
  console.log(
    "All the Bonuses are calculated. You will see them in a few seconds in your character sheet.\nThe last step is the choice of your abilities.\nYour character can master some of the abilities just from the beginning.\nThis abilities include:"
  );
  console.log("-------------------------");
  console.log(`Bashing: ${bashing}`);
  console.log(`Drinking: ${drinking}`);
  console.log(`Recognition: ${recognition}`);
  console.log("-------------------------");
  console.log(
    "Unfortunately, it is not possible to choose your abilities as a part of this tool at the moment. \nBut you can easily follow the instructions on page 27 of Midgard - der Kodex. Or simply ask your Game Master."
  );
  console.log(
    "**********************************************************************************************************************"
  );
  specialAbility(rl);
}

function specialAbility(rl) {
  console.log(
    "You have the possibility to have a random special ability. \nBut it could be a bad one too, dont worry only with a chance of 15%"
  );
  console.log(
    "Every race except the human already got some special abilities and can get a extra one here."
  );
  console.log("Elf:       night vision +2");
  console.log("Dwarf:     night vision +2     toughness +9");
  console.log("Halfling:  good reflexes +9    smell +2");
  console.log(
    "Gnome:     night vision +2     toughness +12       listening +2"
  );
  console.log(
    "**********************************************************************************************************************"
  );
  let spAbil = [];
  switch (character.race) {
    case "elf":
      spAbil.push({
        name: "night vision",
        value: 2,
      });
      break;
    case "dwarf":
      spAbil.push(
        {
          name: "night vision",
          value: 2,
        },
        {
          name: "toughness",
          value: 9,
        }
      );
      break;
    case "halfling":
      spAbil.push(
        {
          name: "good reflexes",
          value: 9,
        },
        {
          name: "smell",
          value: 2,
        }
      );
      break;
    case "gnome":
      spAbil.push(
        {
          name: "night vision",
          value: 2,
        },
        {
          name: "toughness",
          value: 12,
        },
        {
          name: "listening",
          value: 2,
        }
      );
      break;
  }
  rl.question("Should your character get a special ability? ", (answer) => {
    if (answer === "y" || answer === "yes") {
      specialAbilityChooser(spAbil);
      setXPSum();
      sumUpInformations(rl);
    } else {
      setXPSum();
      sumUpInformations(rl);
    }
  });
}

function specialAbilityChooser(spAbil) {
  let abil = JSON.parse(fs.readFileSync("./lib/specialAbilities.json"));
  let rdm = Math.round(Math.min(Math.random() * 100 + 1, 100));
  let abilArr = Object.entries(abil.specialAbilities);
  let isChosen = false;
  abilArr.forEach((elem) => {
    if (rdm <= elem[1].prop && !isChosen) {
      isChosen = true;
      spAbil.push({
        name: elem[1].name,
        value: elem[1].value,
      });
    }
  });
  if (rdm === 100) {
    console.log(
      "Congratulations! You have the option to choose one of the special abilities by yourself. You can find a list with the special abilities on page 27 of Midgard- der Kodex. \n You also get a second roll on a extra special ability."
    );
    specialAbilityChooser(spAbil);
  } else {
    character.spAbil = spAbil;
    console.log("Your character has the following special abilities:");
    console.log(spAbil);
  }
}

function setXPSum() {
  console.log(
    "**********************************************************************************************************************"
  );
  console.log(
    "Now the other abilities of your character can be choosed. It needs a little bit of knowledge about, how the learning of abbilities in Midgard works."
  );
  console.log(
    "First of all, you need Experience(XP) and Gold(GS) to learn and upgrade abilities. \nDepending on what class your character has it is easier or more difficult for him or her to learn some abilities. \nIf your character would like to learn a completly new ability, it costs Learning Units(LE). To upgrade a known ability it costs Training Units(TE)."
  );
  console.log("")

  let rank = character.rank;
  let xpSum = 0;
  if (rank === 2) {
    xpSum = 100;
  } else if (rank === 3) {
    xpSum = 250;
  } else if (rank > 3 && rank < 11) {
    xpSum = 250 * rank - 500;
  } else if (rank > 10 && rank < 17) {
    let base = 2000;
    let multiplier = rank - 10;
    xpSum = base + 500 * multiplier;
  } else if (rank > 16 && rank < 22) {
    let base = 5000;
    let multiplier = rank - 16;
    xpSum = base + 1000 * multiplier;
  } else if (rank > 21 && rank < 28) {
    let base = 10000;
    let multiplier = rank - 21;
    xpSum = base + 2500 * multiplier;
  } else if (rank > 27) {
    let base = 25000;
    let multiplier = rank - 27;
    xpSum = base + 5000 * multiplier;
  }
  character.xpSum = xpSum;
  console.log(character.xpSum);
}

function sumUpInformations(rl) {
  console.log(
    "**********************************************************************************************************************"
  );
  rl.question(
    "Do you want to save your character sheet in a file? ",
    (answer) => {
      if (answer === "yes" || answer === "y") {
        saveSheetInFile();
        rl.close();
      } else {
        rl.question(
          "Are you sure? All your settings will be deleted. Continue? ",
          (answer) => {
            if (answer === "yes" || answer === "y") {
              rl.close();
              character = {};
              console.log(
                "**********************************************************************************************************************"
              );
              console.log("\n\n\n");
              startgen();
            } else {
              saveSheetInFile();
              rl.close();
            }
          }
        );
      }
    }
  );
}

function formatSpecialAbilities() {
  let arr = character.spAbil;
  let str = "";
  arr.forEach((elem) => {
    str += "(" + elem.name + ": " + elem.value + ") |\t";
  });
  return str;
}

function saveSheetInFile() {
  let dir = __dirname + "/Characters/";
  let filename = character.name.replace(/ /g, "_");
  let content = setContentToFile();
  fs.writeFileSync(dir + filename + ".txt", content);
  console.log(`File successfully saved as ${dir}${filename}.txt!`);
}

function setContentToFile() {
  let content =
    "***************************************************************************************************************************\n" +
    "CHARACTERSHEET\n" +
    "***************************************************************************************************************************\n" +
    "***************************************************************************************************************************\n" +
    "NAME: " +
    `${character.name}`.padStart(22) +
    "\tGENDER: " +
    `${character.gender}`.padStart(12) +
    "\tAGE: " +
    `${character.age}`.padStart(13) +
    "\n" +
    "RACE: " +
    `${character.race}`.padStart(22) +
    "\tCLASS: " +
    `${character.class}`.padStart(13) +
    "\tRANK: " +
    `${character.rank}`.padStart(12) +
    "\n" +
    "MILIEU: " +
    `${character.status}`.padStart(20) +
    "\tRELIGION: \t\t\t" +
    "\tHOMETOWN: \t\t\t\n" +
    "---------------------------------------------------------------------------------------------------------------------------\n" +
    "STATURE: " +
    `${character.stature}`.padStart(19) +
    "\tHEIGHT: " +
    `${character.height}`.padStart(12) +
    "\tWEAPONHAND: " +
    `${character.whand}`.padStart(6) +
    "\n" +
    "***************************************************************************************************************************\n" +
    "STRENGTH: " +
    `${character.st}`.padStart(18) +
    "\tDEXTERITY: " +
    `${character.gs}`.padStart(9) +
    "\tAGILITY: " +
    `${character.gw}`.padStart(9) +
    "\n" +
    "ENDURANCE: " +
    `${character.ko}`.padStart(17) +
    "\tINTELLIGENCE: " +
    `${character.wi}`.padStart(6) +
    "\tMAGIC TALENT: " +
    `${character.zt}`.padStart(4) +
    "\n" +
    "---------------------------------------------------------------------------------------------------------------------------\n" +
    "APPEARENCE: " +
    `${character.au}`.padStart(16) +
    "\tCHARISMA: " +
    `${character.pa}`.padStart(10) +
    "\tWILL POWER: " +
    `${character.wk}`.padStart(6) +
    "\n" +
    "***************************************************************************************************************************\n" +
    "LP: " +
    `${character.lp}`.padStart(3) +
    "\n\n" +
    "AP: " +
    `${character.ap}`.padStart(3) +
    "\n\n" +
    "***************************************************************************************************************************\n" +
    "MOVEWIDTH: " +
    `${character.b}`.padStart(17) +
    "\tENDURANCEBONUS: " +
    `${character.ab}`.padStart(4) +
    "\n" +
    "DAMAGEBONUS: " +
    `${character.schb}`.padStart(15) +
    "\tATTACKBONUS: " +
    `${character.anb}`.padStart(7) +
    "\n" +
    "DEFENSEBONUS: " +
    `${character.abb}`.padStart(14) +
    "\tMAGICBONUS: " +
    `${character.zaub}`.padStart(8) +
    "\n" +
    "MIND RESISTENCE: " +
    `${character.resbg}`.padStart(11) +
    "\tBODY RESISTENCE: " +
    `${character.resbk}`.padStart(3) +
    "\n" +
    "***************************************************************************************************************************\n" +
    "ABILITIES:\n" +
    "---------------------------------------------------------------------------------------------------------------------------\n" +
    "---------------------------------------------------------------------------------------------------------------------------\n" +
    "BORN ABILITIES:\n" +
    "BASHING: " +
    `${character.bashing}`.padStart(19) +
    "\tDRINKING: " +
    `${character.drinking}`.padStart(10) +
    "\n" +
    "RECOGNITION: " +
    `${character.recognition}`.padStart(15) +
    "\n" +
    "SPECIAL ABILITIES: " +
    `${formatSpecialAbilities()}` +
    "\n" +
    "---------------------------------------------------------------------------------------------------------------------------\n" +
    "LEARNED ABILITIES:\n" +
    "\n\n\n\n\n\n\n\n\n\n" +
    "---------------------------------------------------------------------------------------------------------------------------\n" +
    "WEAPON ABILITIES:\n" +
    "\n\n\n\n\n";

  return content;
}

startgen();
