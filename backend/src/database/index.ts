import { Sequelize } from "sequelize-typescript";

import {
  User,
  Contact,
  Ticket,
  Message,
  Whatsapp,
  ContactCustomField,
  Queue,
  WhatsappQueue,
  UserQueue,
  QuickAnswer
} from "../models/index";

// eslint-disable-next-line
const dbConfig = require("../config/database");

const sequelize = new Sequelize(dbConfig);

const models = [
  User,
  Contact,
  Ticket,
  Message,
  Whatsapp,
  ContactCustomField,
  Queue,
  WhatsappQueue,
  UserQueue,
  QuickAnswer
];

sequelize.addModels(models);

export default sequelize;
