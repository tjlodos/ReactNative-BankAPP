import * as Yup from "yup";

const validations = Yup.object().shape({
	NameSurname: Yup
		.string("Geçersiz Ad Soyad")
		.required("Bu alan Zorunlu"),
	CustomerTckn: Yup
		.string().matches(/^[0-9]{11}$/, 'Hatalı TC Kimlik No Girdiniz.. ')
		.max(11)
		.required("Bu alan Zorunlu"),
	Password: Yup
		.string()
		.min(6,"En az 6 karakter girin")
		.required("Bu alan Zorunlu"),
	PhoneNumber: Yup
		.string().matches(/^[0-9]{10}$/, 'Hatalı Telefon Numarası ')
		.required("Bu alan Zorunlu")
});

module.exports = validations;