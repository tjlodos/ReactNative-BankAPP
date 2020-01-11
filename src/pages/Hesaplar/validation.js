import * as Yup from "yup";

const validation = Yup.object().shape({
	bakiyeTutari: Yup
		.string().matches(/^[0-9]/, 'Hatalı Tutar Girdiniz.. ')
		.required("Bu alan Zorunlu"),
	hesapAdi: Yup
		.string("Hesap Adınızı Giriniz")
		.required("Bu alan Zorunlu"),
	
});

module.exports = validation;