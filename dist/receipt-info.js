'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _esm = require('date-fns/esm');

var _esm2 = _interopRequireDefault(_esm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReceiptInfo = function () {
    function ReceiptInfo(number, date, seller, buyer, isPrinted, type, carrier, donationID) {
        _classCallCheck(this, ReceiptInfo);

        this.number = number;
        this.date = date;
        this.seller = seller;
        this.buyer = buyer;
        this.buyer.id = this.buyer.id || '0000000000';
        this.isPrinted = isPrinted;
        this.type = type || '07';
        this.carrier = carrier;
        this.donationID = donationID;
    }

    _createClass(ReceiptInfo, [{
        key: 'toXMLObject',
        value: function toXMLObject() {
            var xmlObject = {
                InvoiceNumber: this.invoiceNumber,
                InvoiceDate: (0, _esm2.default)(this.date, 'YYYYMMDD'),
                InvoiceTime: (0, _esm2.default)(this.date, 'hh:mm:ss'),
                Seller: {
                    Identifier: this.seller.id,
                    Name: this.seller.name
                },
                Buyer: {
                    Identifier: this.buyer.id,
                    Name: this.buyer.name
                },
                InvoiceType: this.type,
                DonateMark: 0,
                PrintMark: this.isPrinted ? 'Y' : 'N',
                RandomNumber: Math.floor(1000 + Math.random() * 9000)
            };

            if (this.donationID) {
                xmlObject.DonateMark = 1;
                xmlObject.NPOBAN = this.donationID;
            }

            if (this.carrier) {
                xmlObject.CarrierType = this.carrier.type;
                xmlObject.CarrierId1 = this.carrier.id;
                xmlObject.CarrierId2 = this.carrier.id;
            }

            return xmlObject;
        }
    }]);

    return ReceiptInfo;
}();

exports.default = ReceiptInfo;