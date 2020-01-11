import * as Yup from "yup";

const validations = Yup.object().shape({
	CustomerTckn: Yup
		.string().matches(/^[0-9]{11}$/, 'Hatalı TC Kimlik No Girdiniz.. ')
		.max(11)
		.required("Bu alan Zorunlu"),
	Password: Yup
		.string()
		.min(3,"En az 3 karakter girin")
		.required("Bu alan Zorunlu"),
});

module.exports = validations;