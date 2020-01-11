import * as Yup from "yup";

const validation = Yup.object().shape({
	tutar: Yup
		.string('Hatalı tutar Girdiniz.. ')
		.required("Bu alan Zorunlu"),
});

module.exports = validation;