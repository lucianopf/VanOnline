var mongoose = require('mongoose');

module.exports = mongoose.model('Aluno',{
  id: String,
  nome : String ,
  curso : String ,
  turno : String ,
  valor : String ,
  dia_pagamento : String ,
  horario :
    { seg_manha_vai : String ,
    seg_manha_volta : String ,
    seg_noite_vai :   String ,
    seg_noite_volta : String ,
    ter_manha_vai :   String ,
    ter_manha_volta : String ,
    ter_noite_vai :   String ,
    ter_noite_volta : String ,
    qua_manha_vai :   String ,
    qua_manha_volta : String ,
    qua_noite_vai :   String ,
    qua_noite_volta : String ,
    qui_manha_vai :   String ,
    qui_manha_volta : String ,
    qui_noite_vai :   String ,
    qui_noite_volta : String ,
    sex_manha_vai :   String ,
    sex_manha_volta : String ,
    sex_noite_vai :   String ,
    sex_noite_volta : String
  }
});
