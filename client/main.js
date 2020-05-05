import { Template } from 'meteor/templating';
import './main.html';
import { Contacts } from '../db.js'


Template.body.helpers({
	contacts : function(){
		console.log("helper");
		return Contacts.find();
	},
});

Template.save_contact.events({
	'click #savebtn'(event){
		var u_name =  $('#cname').val();
		var u_email = $('#cemail').val();
		var u_phone = $('#cphone').val();

		Contacts.insert({cname : u_name,cemail : u_email,cphone : u_phone});
		console.log("inserted");
	},
});

Template.contact.events({
	'click [name=updatebtn]'(event){
		// console.log(event.target.id)
		u_id = event.target.id;
		u_name = $('#edit' + u_id + '_cname').val();
		u_email = $('#edit' + u_id +'_cemail').val();
		u_phone = $('#edit'+ u_id +'_cphone').val();
		Contacts.update(
			{_id:u_id},
			{$set:{
				cname : u_name,
				cemail : u_email,
				cphone : u_phone,
			}}
		);
		console.log("updated");
	},
	'click [name=deletebtn]'(event){
		u_id = event.target.id;
		Contacts.remove({_id:u_id});
		console.log("deleted");

	}
});
