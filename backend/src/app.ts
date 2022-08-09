let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors')
let Ddos = require('ddos')
let ddos = new Ddos({burst:10, limit:15})

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST'],
  // "Access-Control-Allow-Headers": "*"
};

import { CandidatesRouter } from './routes/doctorRouter';
import { WorkingHoursRouter } from './routes/workingHoursRouter';
import { AppointmentsRouter } from './routes/appointmentsRouter';

export class App {
  public app: any;

  constructor() {
    this.app = express();
    this.app.options('*', cors())
    this.app.use(cors(corsOptions));
    this.app.use(ddos.express);
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(express.static(path.join(__dirname, 'public')));

    this.app.use('/',
      new AppointmentsRouter().router, 
      new CandidatesRouter().router,
      new WorkingHoursRouter().router
    );
  }
}