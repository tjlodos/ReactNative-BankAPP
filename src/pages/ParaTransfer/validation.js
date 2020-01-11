import * as Yup from "yup";

const validations = Yup.object().shape({
	paraMiktari: Yup
		.string().matches(/^[0-9]/, 'Hatalı Tutar Girdiniz.. ')
		.max(6)
		.required("Bu alan Zorunlu"),
	musteriNo: Yup
		.string().matches(/^[0-9]/, 'Hatalı Musteri No Girdiniz.. ')
		.required("Bu alan Zorunlu"),

});

module.exports = validations;