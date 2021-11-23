ticketTypes = [{
	"ticketName": "远程支持",
	"content": "可获得活动PPT等资料",
	"price": 9.99,
	"remainder": 10 // 余票
}, {
	"ticketName": "赞助商",
	"content": "获得品牌露出机会，详情联系...",
	"price": 9.99,
	"remainder": 2 // 余票
}, {
	"ticketName": "标准票",
	"content": "可获得活动现场参加活动的机会",
	"price": 0.99,
	"remainder": 4 // 余票
}];

num = -1;

participantList = [];
Count = [0, 0, 0, 0];
totalVotes = 0;
totalPrice = "0.00";
var ticketTypesList = document.getElementById("ticketTypesList");
var content = document.getElementsByClassName("content")[0];
var votes = document.getElementById("votes");
var price = document.getElementById("price");

Number.prototype.add = function(arg) {
	var r1, r2, m;
	try {
		r1 = this.toString().split(".")[1].length
	} catch (e) {
		r1 = 0
	}
	try {
		r2 = arg.toString().split(".")[1].length
	} catch (e) {
		r2 = 0
	}
	m = Math.pow(10, Math.max(r1, r2))
	return (this * m + arg * m) / m
}

Number.prototype.sub = function(arg) {
	return this.add(-arg);
}

function init() {
	let child = ticketTypesList.lastElementChild;
	while (child) {
		ticketTypesList.removeChild(child);
		child = ticketTypesList.lastElementChild;
	}
	let contentChilds = content.children;
	for (let j = contentChilds.length - 1; j > 1; j--) {
		content.removeChild(contentChilds[j]);
	}
	for (let i = 0; i < ticketTypes.length; i++) {
		// div.ticket-types-msg
		let p1 = document.createElement("p");
		p1.innerText = ticketTypes[i].ticketName;
		let p2 = document.createElement("p")
		p2.innerHTML = ticketTypes[i].content;
		let p3 = document.createElement("p")
		p3.innerHTML = ticketTypes[i].price + " 元";
		let msgDiv = document.createElement("div");
		msgDiv.classList.add("ticket-types-msg");
		msgDiv.appendChild(p1);
		msgDiv.appendChild(p2);
		msgDiv.appendChild(p3);

		//div.quantity
		//div.quantity-func
		//div.quantity-block reduce
		let span1 = document.createElement("span");
		span1.innerHTML = "-";
		let divReduce = document.createElement("div");
		divReduce.classList.add("quantity-block");
		divReduce.classList.add("reduce");
		divReduce.appendChild(span1);

		//div.quantity-block amount
		let span2 = document.createElement("span");
		span2.innerHTML = "0";
		let divAmount = document.createElement("div");
		divAmount.classList.add("quantity-block");
		divAmount.classList.add("amount");
		divAmount.appendChild(span2);

		//div.quantity-block add
		let span3 = document.createElement("span");
		span3.innerHTML = "+";
		let divAdd = document.createElement("div");
		divAdd.classList.add("quantity-block");
		divAdd.classList.add("add");
		divAdd.appendChild(span3);

		let quantityFunc = document.createElement("div");
		quantityFunc.classList.add("quantity-func")
		quantityFunc.appendChild(divReduce);
		quantityFunc.appendChild(divAmount);
		quantityFunc.appendChild(divAdd);


		let quantity = document.createElement("div");
		quantity.classList.add("quantity");
		quantity.appendChild(quantityFunc);

		let itemDiv = document.createElement("div");
		itemDiv.classList.add("ticket-types-item");
		itemDiv.appendChild(msgDiv);
		itemDiv.appendChild(quantity);

		ticketTypesList.appendChild(itemDiv);

		divReduce.addEventListener("click", function(e) {
			num = span2.innerHTML;
			if (num > 0) {
				span2.innerHTML = num - 1;
				let tp = "part" + i;
				let snum = span2.innerHTML;
				if (snum == ticketTypes[i].remainder) {
					let lastP = p3.lastElementChild;
					p3.removeChild(lastP);
				}
				if (snum < ticketTypes[i].remainder) {
					totalVotes--;

					votes.innerHTML = "";

					let votesText = document.createTextNode(totalVotes);
					votes.appendChild(votesText);
					price.innerHTML = "";

					totalPrice = Number(totalPrice).sub(Number(ticketTypes[i].price)).toString();
					if (totalPrice == "0") {
						totalPrice = "0.00";
					}
					let priceStr = totalPrice.toString().split(".");
					if (priceStr[1].toString().length > 2) {
						priceStr[1] = priceStr[1].toString().substring(0, 2);
					}

					let priceText = document.createTextNode(priceStr[1]);
					price.appendChild(priceText);

					price.setAttribute("data-price", priceStr[0] + ".");
					let divBlock = document.getElementsByClassName(tp);
					let lastBlock = divBlock[divBlock.length - 1];
					content.removeChild(lastBlock);
					delete participantList[tp + Count[i]];
					Count[i]--;
				}
			}
		});

		divAdd.addEventListener("click", function(e) {
			num = span2.innerHTML;
			if (num < 9) {
				span2.innerHTML = Number(num) + 1;

				let tp = "part" + i;
				let snum = span2.innerHTML;
				let titleDiv = document.createElement("div");
				let type = p1.innerHTML;
				let str = "参与者信息（“ " + type + " ” 票第 " + snum + " 位）";
				let text = document.createTextNode(str);
				titleDiv.classList.add("block-title");
				titleDiv.appendChild(text);

				let pName = document.createElement("p");
				pName.innerHTML = "姓名";
				let inputName = document.createElement("input");
				inputName.name = "inputName" + tp;
				inputName.setAttribute("placeholder", "请输入您的真实姓名");
				let blockInputName = document.createElement("div");
				blockInputName.classList.add("block-input");
				blockInputName.appendChild(inputName);

				let pIdCard = document.createElement("p");
				pIdCard.innerHTML = "身份证";
				let inputInCard = document.createElement("input");
				inputInCard.name = "inputInCard" + tp;
				inputInCard.setAttribute("placeholder", "由于现场安保需要，请输入您的身份证号");
				let blockInputIdCard = document.createElement("div");
				blockInputIdCard.classList.add("block-input");
				blockInputIdCard.appendChild(inputInCard);
				let flag = "" + tp + Count[i];

				inputName.addEventListener('keyup', function(e) {
					participantList[flag].name = e.target.value;
				});

				inputInCard.addEventListener('keyup', function(e) {
					participantList[flag].idCard = e.target.value;
				});


				let radio1 = document.createElement("input");
				radio1.setAttribute("type", "radio");
				radio1.setAttribute("name", tp + Count[i]);
				radio1.setAttribute("value", "1");
				let label1 = document.createElement("label")
				label1.appendChild(radio1);
				let text1 = document.createTextNode("男性")
				label1.appendChild(text1);
				let radio2 = document.createElement("input");
				radio2.setAttribute("type", "radio");
				radio2.setAttribute("name", tp + Count[i]);
				radio2.setAttribute("value", "2");
				let label2 = document.createElement("label")
				label2.appendChild(radio2);
				let text2 = document.createTextNode("女性")
				label2.appendChild(text2);
				let radio3 = document.createElement("input");
				radio3.setAttribute("type", "radio");
				radio3.setAttribute("name", tp + Count[i]);
				radio3.setAttribute("value", "3");
				let label3 = document.createElement("label")
				label3.appendChild(radio3);
				let text3 = document.createTextNode("其他")
				label3.appendChild(text3);
				let radio4 = document.createElement("input");
				radio4.setAttribute("type", "radio");
				radio4.setAttribute("name", tp + Count[i]);
				radio4.setAttribute("value", "4");
				let label4 = document.createElement("label")
				label4.appendChild(radio4);
				let text4 = document.createTextNode("不愿透露")
				label4.appendChild(text4);
				
				radio1.addEventListener('click', function(e) {
					participantList[flag].sex = e.target.defaultValue;	
				});
				radio2.addEventListener('click', function(e) {
					participantList[flag].sex = e.target.defaultValue;
				});
				radio3.addEventListener('click', function(e) {
					participantList[flag].sex = e.target.defaultValue;
				});
				radio4.addEventListener('click', function(e) {
					participantList[flag].sex = e.target.defaultValue;
				});
				
				Count[i]++;
				let radioDiv = document.createElement("div");
				radioDiv.classList.add("block-radio");
				radioDiv.appendChild(label1);
				radioDiv.appendChild(label2);
				radioDiv.appendChild(label3);
				radioDiv.appendChild(label4);

				let divContent = document.createElement("div");
				divContent.classList.add("block-body");
				divContent.appendChild(pName);
				divContent.appendChild(blockInputName);
				divContent.appendChild(pIdCard);
				divContent.appendChild(blockInputIdCard);
				divContent.appendChild(radioDiv);

				let divBlock = document.createElement("div");
				divBlock.classList.add("block");
				divBlock.appendChild(titleDiv);
				divBlock.appendChild(divContent);

				divBlock.classList.add(tp);
				if (snum > ticketTypes[i].remainder) {
					let span = document.createElement("span");
					span.innerHTML = " 仅剩 " + ticketTypes[i].remainder + " 张";
					let pChilds = p3.children;
					for (let j = pChilds.length - 1; j >= 0; j--) {
						p3.removeChild(pChilds[j]);
					}
					p3.appendChild(span);
				} else {
					content.appendChild(divBlock);
					participantList[flag] = {
						type: ''+ticketTypes[i].ticketName,
						name: '',
						idCard: '',
						sex: ''
					};
					totalVotes++;

					votes.innerHTML = "";

					let votesText = document.createTextNode(totalVotes);
					votes.appendChild(votesText);

					totalPrice = Number(totalPrice).add(Number(ticketTypes[i].price)).toString();
					price.innerHTML = "";
					let priceStr = totalPrice.toString().split(".");
					let priceText = document.createTextNode(priceStr[1].substring(0, 2));
					price.appendChild(priceText);
					price.setAttribute("data-price", priceStr[0] + ".");
				}
			}
		});

		if (i !== ticketTypes.length - 1) {
			let hr = document.createElement("hr");
			hr.classList.add("hr")
			ticketTypesList.appendChild(hr);
		}
	}
}

init();

function submitOrder() {
	alert("输出请看控制台！");
	let tel = document.getElementById("buyerPhone");
	console.log("手机号：",tel.value);
	let email = document.getElementById("buyerEmail");
	console.log("邮箱：", email.value);
	console.log("订单详细",participantList)
	console.log("总票数：", totalVotes);
	console.log("总价：", totalPrice);
}
