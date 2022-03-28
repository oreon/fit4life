import { useStoreActions } from 'easy-peasy';
import * as SQLite from 'expo-sqlite'
import { create } from 'lodash';
import { today } from '../lib/helpers';

export const db = SQLite.openDatabase("db.appDb");
//import { BaseModel, types } from 'expo-sqlite-orm'


 
export default class TodoRepo  {
  // constructor(obj) {
  //   super(obj)
  // }
  setrecords = useStoreActions((actions) => actions.setrecords);
  constructor(){
    TodoRepo.create()
    TodoRepo.dummyrecords()
  }

  static async create(){
    await db.transaction(tx => {
      tx.executeSql(
        //'drop TABLE  DONES',
        //'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, count INT)'
        'CREATE TABLE IF NOT EXISTS RECORDS ( date DATE unique PRIMARY KEY, dones TEXT, msmt TEXT, score INT )',
        )
    })
  }

  static async dummyrecords(){
    await db.transaction(tx => {
      tx.executeSql(
        //'drop TABLE  DONES',
        //'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, count INT)'
        "INSERT Into RECORDS ( date , dones  msmt  score  ) values ('2022-02-03','[1,2]', '{1:3,2:5,3:125}',60])",
        )
    })

    await db.transaction(tx => {
      tx.executeSql(
        //'drop TABLE  DONES',
        //'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, count INT)'
        "INSERT Into RECORDS ( date , dones  msmt  score  ) values ('2022-02-06','[1,2]', '{1:3,2:5,3:125}',60])",
        )
    })

    await db.transaction(tx => {
      tx.executeSql(
        //'drop TABLE  DONES',
        //'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, count INT)'
        "INSERT Into RECORDS ( date , dones  msmt  score  ) values ('2022-02-09','[1,2,3]', '{1:9,2:8,3:125}',80])",
        )
    })
  }

  fetchData = async () => {
    await db.transaction(tx => {
      // sending 4 arguments in executeSql
      tx.executeSql('SELECT * FROM RECORDS order by date desc', null, // passing sql query and parameters:null
        // success callback which sends two things Transaction object and ResultSet Object
        (txObj, { rows: { _array } }) => {
          console.log("found ", _array)
          if(_array)
            this.setrecords( _array ) 
        },

        // failure callback which sends two things Transaction object and Error
        (txObj, error) => console.log('Error ', error)
        ) // end executeSQL
    }) // end transaction
  }

  // static async getTodays(){
  //   const dones = await Dones.findBy({ date_eq: today()  }).dones
  //   console.log('d ->' +dones)
  //   return JSON.parse ( dones )
  // }

  // static async updateTodays(vals){
  //   let current_done = await Dones.findBy({ date_eq: today() })
  //   if(current_done){
  //       current_done.dones = JSON.stringify(vals)
  //       current_done.save()
  //   }else{
  //       current_done = Dones.create(new Dones({ id: 99, date:today(), dones: vals}))
  //   }
  //   return current_done
  // }
 
  // static get database() {
  //   return async () => SQLite.openDatabase('db.appDb')
  // }
 
  // static get tableName() {
  //   return 'MyDones'
  // }
 
  // static get columnMapping() {
  //   return {
  //     id: { type: types.INTEGER, primary_key: true , AUTOINCREMENT}, // For while only supports id as primary key
  //     date: { type: types.DATE, not_null: true,  unique: true  },
  //     dones: { type: types.TEXT , default: () => '[]'},
  //    // age: { type: types.NUMERIC },
  //    // another_uid: { type: types.INTEGER, unique: true },
  //     timestamp: { type: types.INTEGER, default: () => Date.now() }
  //   }

  //   }
}