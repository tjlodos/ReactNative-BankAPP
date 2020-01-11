import * as Yup from "yup";

const validations = Yup.object().shape({
	paraMiktari: Yup
	.string().matches(/^[0-9]/, 'Hatalı Tutar Girdiniz.. ')
	.required("Bu alan Zorunlu"),

});

module.exports = validations;