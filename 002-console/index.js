#!/usr/bin/env node

const { DateTime } = require('luxon');
const yargs = require('yargs');

yargs
  .scriptName('current')
  .usage('$0 <cmd> [args]')
  .option('current', {
    type: 'string',
    default: DateTime.now().toISO(),
    describe: 'date to ISO string',
  })
  .command(
    'current',
    'current date',
    (yargs) => {
        yargs.option('year', {
          alias: 'y',
        }),
        yargs.option('month', {
          alias: 'm',
        }),
        yargs.option('date', {
          alias: 'd',
        });
    },
    ({ current, year, month, date }) => {
      const curDate = DateTime.fromISO(current);
      if (year) {
        const year = curDate.year;
        console.log(year);
        return;
      }
      if (month) {
        const month = curDate.month;
        console.log(month);
        return;
      }
      if (date) {
        const date = curDate.toFormat('yyyy LLL dd');
        console.log(date);
        return;
      }
      console.log(current);
    }
  )
  .command(
    'add',
    'add days',
    (yargs) => {
        yargs.option('d', {
          type: 'number',
          default: 0,
        });
    },
    ({ current, d }) => {
      const date = DateTime.fromISO(current).plus({ days: d }).toISODate();
      console.log(date);
    }
  )
  .command(
    'sub',
    'sub month',
    (yargs) => {
      yargs.option('month', {
        type: 'number',
        default: 0,
      });
    },
    ({ current, month }) => {
      const date = DateTime.fromISO(current).minus({ month }).toISODate();
      console.log(date);
    }
  )
  .help().argv;
