var fs = require('fs');
var path = require('path');

function replace(sourceTemplate, datas) {
	Object.keys(datas).forEach(key => {
		sourceTemplate = sourceTemplate.replace(key, datas[key]);
	});
	return sourceTemplate;
}
const generateSql = () => {
	let templateSql = `INSERT INTO "DCITS_PAYMENT"."PRD_ONLINE_ORDER"("REF_NO", "BUSI_REF_NO", "MER_ID", "MER_NAME", "BUSI_TYPE", "TRAN_TYPE", "SOURCE_FORMAT", "CHANNEL", "FORMAT", "FORMAT_NO", "PAY_TYPE", "MER_ORDER_ID", "MER_PAY_NO", "TRADE_TYPE", "GOODS_NAME", "BANK_CARD_NO", "BANK_PHONE_NO", "CONTRACT_NO", "CONTRACT_TYPE", "PAY_CHANNEL_TYPE", "ORDER_ID", "TRAN_SEQ_NO", "TRANS_NO", "CCY", "TRAN_AMT", "ACTUAL_ORDER_AMT", "TOTAL_PREF_AMT", "MER_AC_CODE", "MER_PREF_AMT", "USER_AC_CODE", "USER_PREF_AMT", "CHARGE_TYPE", "CHARGE_NAME", "CHARGE_AMT", "OWNER", "CUT_PROFIT_AMT", "OPERATOR", "ORDER_DATE", "CREATE_TIME", "END_TIME", "ORDER_AFFIRM_TIME", "SETTLE_AMT", "SETTLE_FLAG", "VERIFICATION_FLAG", "COLLATE_DATE", "BUSI_STATUS", "LONGITUDE", "LATITUDE", "PROC_NAME", "CITY_NAME", "AREA_NAME", "STREET", "PAYER_BANK", "PAYER_PAY_TYPE", "PAYER_ACCT", "PAYER_NAME", "PAYER_DOCUMENT_ID", "PAYER_PHONE", "PAYER_CVV2", "PAYER_VALID_DATE", "REMARK", "RESPONSE_CODE", "RESPONSE_MSG", "EXPAND1", "EXPAND2", "EXPAND3", "EXPAND4", "EXPAND5", "EXPAND6", "PAYER_EXTEND_ID", "INTEGRAL_SUM", "INTEGRAL_DEDUC_AMT") VALUES ('refNo', NULL, 'merId', 'merName', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'merOrderId', 'merPayNo', '01', 'goodsName', 'bankCardNo', NULL, 'FASTPAY0000000000001', '01', NULL, 'orderId', NULL, '1585877224680', NULL, '12.34', '12.34', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2020-04-02 14:50:00', '2020-04-02 17:26:49', '2020-04-02 09:27:10', NULL, NULL, NULL, NULL, NULL, '02', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '商品备注信息', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

`;
	const GENERATE_NUM = 102;
	let file = fs.openSync(path.join("C:/Users/luhha/Desktop/test.sql"),"a+");
	for (let i = 2; i < GENERATE_NUM; i++)
	{
		let temp = i;
		if (i < 10)
		{
			temp = "0"+i;
		}
		let refNo = "202003250001242" + temp;
		let randomMer =  Math.round(Math.random()*5);
		///let merId = "4410546513213210" +randomMer;
		let merId = "44105465132132102123";
		let merName = "MERNAME-" + randomMer;
		let merOrderId = "12312341234123"+temp;
		let merPayNo = "12312341234123"+temp;
		let bankCardNo = "1122334455112233"+randomMer;
		let orderId = "123123412341234000"+temp;
		let goodsName = "商品"+temp;
		let resultSql = replace(templateSql, {refNo, merId, merName, merOrderId, merPayNo, bankCardNo,orderId,goodsName});
		fs.writeFileSync(file, resultSql);
	}
}
generateSql();