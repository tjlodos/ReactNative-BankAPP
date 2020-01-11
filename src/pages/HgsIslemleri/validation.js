import * as Yup from "yup";

const validation = Yup.object().shape({
	plaka: Yup
		.string('Hatalı PLAKA Girdiniz.. ')
		.required("Bu alan Zorunlu"),
});

module.exports = validation;