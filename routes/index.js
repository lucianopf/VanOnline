var express = require('express');
var router = express.Router();
var Aluno = require('../models/aluno');
var User = require('../models/user');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true
	}));


	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		res.render('home', { user: req.user });
	});

	/* GET NewAluno Page */
	router.get('/newaluno', isAuthenticated, function(req, res){
		res.render('newaluno',{});
	});

	/* POST to Add ALUNO Service */
	router.post('/addaluno',isAuthenticated, function(req, res) {
			// Get our form values. These rely on the "name" attributes
			var nome = req.body.nome;var curso = req.body.curso;var turno = req.body.turno;var valor = req.body.valor;var dia = req.body.dia;
			//Horarios
			var d1_t1 = req.body.d1_t1;var d2_t1 = req.body.d2_t1;var d3_t1 = req.body.d3_t1;var d4_t1 = req.body.d4_t1;var d5_t1 = req.body.d5_t1;var d1_t2 = req.body.d1_t2;var d2_t2 = req.body.d2_t2;
			var d3_t2 = req.body.d3_t2;var d4_t2 = req.body.d4_t2;var d5_t2 = req.body.d5_t2;var d1_t3 = req.body.d1_t3;var d2_t3 = req.body.d2_t3;var d3_t3 = req.body.d3_t3;var d4_t3 = req.body.d4_t3;
			var d5_t3 = req.body.d5_t3;var d1_t4 = req.body.d1_t4;var d2_t4 = req.body.d2_t4;var d3_t4 = req.body.d3_t4;var d4_t4 = req.body.d4_t4;var d5_t4 = req.body.d5_t4;
			// Set our collection
			var newAluno = new Aluno();
			newAluno.nome = nome;newAluno.curso = curso;newAluno.turno = turno;newAluno.valor = valor;newAluno.dia_pagamento = dia;newAluno.horario.seg_manha_vai = d1_t1;newAluno.horario.seg_manha_volta = d1_t2;
			newAluno.horario.seg_noite_vai = d1_t3;newAluno.horario.seg_noite_volta = d1_t4;newAluno.horario.ter_manha_vai = d2_t1;newAluno.horario.ter_manha_volta = d2_t2;newAluno.horario.ter_noite_vai = d2_t3;
			newAluno.horario.ter_noite_volta = d2_t4;newAluno.horario.qua_manha_vai = d3_t1;newAluno.horario.qua_manha_volta = d3_t2;newAluno.horario.qua_noite_vai = d3_t3;newAluno.horario.qua_noite_volta = d3_t4;
			newAluno.horario.qui_manha_vai = d4_t1;newAluno.horario.qui_manha_volta = d4_t2;newAluno.horario.qui_noite_vai = d4_t3;newAluno.horario.qui_noite_volta = d4_t4;newAluno.horario.sex_manha_vai = d5_t1;
			newAluno.horario.sex_manha_volta = d5_t2;newAluno.horario.sex_noite_vai = d5_t3;newAluno.horario.sex_noite_volta = d5_t4;
			//Save Aluno em User
			req.user.alunos.push(newAluno);
			req.user.save(function(err) {
					if (err){
							console.log('Erro ao salvar o aluno: '+err);
							res.redirect('/newaluno');
					}
					console.log('Aluno registrado!');
					res.redirect('/home');
			});
	});


	/* GET Dialist */
	router.get('/dialist', isAuthenticated, function(req, res){
		var d = new Date();
		var weekday = d.getDay();
		res.render('dialist', { user: req.user , "dia" : weekday });
	});


	/* POST to Remove ALUNO Service */
	router.post('/removealuno',isAuthenticated ,function(req, res) {
			var id = req.body.id_aluno;
			//req.user  = Usuario
			// Submit to the DB
			console.log("Comecando:");
			var tam = req.user.alunos.length;
			var i = 0;
			//Itera sobre os alunos de User
			while(i<tam){
				//Se achou o aluno especifico
				if(req.user.alunos[i]._id == id){
					console.log("Achei");
					req.user.alunos.splice(i, 1);
					console.log("Deletei");
				}
				i = i + 1;
			}
			req.user.save(function(err) {
					if (err){
							console.log('Erro ao salvar o aluno: '+err);
							res.redirect('/newaluno');
					}
					console.log('Aluno registrado!');
					res.redirect('/home');
			});
	});



	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
}
