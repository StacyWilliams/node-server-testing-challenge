const Students = require('./studentsModel.js');
const db = require('../data/dbConfig.js');

describe('students model', () => {

    beforeEach(async () => {
        await db('students').truncate();
    })

    it('should set environment to testing', () => {
        expect(process.env.DB_ENV).toBe('testing')
    })
    
describe('insert()', () => {
    it('should insert students into the db' ,async () => {
   //insert a record
   const [id] = await Students.insert({name: 'Stacy'});
  
   let student = await db('students')
   .where({id})
   .first();
   
   //assert the record was inserted

   expect(student.name).toBe('Stacy');
    })
})
})
    
