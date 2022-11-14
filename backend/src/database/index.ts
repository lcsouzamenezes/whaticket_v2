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

const sequelize = new Sequelize(dbConfig);

sequelize.addModels(models);

export default sequelize;
