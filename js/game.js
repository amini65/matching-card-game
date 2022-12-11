let Game = [1, 1, 1, 1, 1, 3, 3, 3, 3, 7, 7, 7];
let Level = 0;
let One = 0;
let Three = 0;
let Seven = 0;
let OneBet = [0, 0.4, 1.1];
let ThreeBet = [0, 1.6, 3.2];
let SevenBet = [0, 2.7, 5.1];
let names = { 1: "pip", 3: "hat", 7: "horseshoe" }

$('#bet-start').click(function() {
    if ($('#box-btn').prop('checked') == true) {
        $(this).find('.bar').removeAttr('style');
        $('.menu').css("margin-right", "-250px")
    }
    Level = 0;
    One = 0;
    Three = 0;
    Seven = 0;
    Amount = $('#amount').val();
    $(this).addClass('disabledbutton');
    $("#boxLoading").show();
    $('.card').each(function(i, item) {
        $(item).removeClass('hidden');
    });
    $("#boxLoading").hide();
});

$('.card').click(function() {

    if (Level == 0) {
        Game = shuffle(Game);
    }
    const $card = $(this);
    var row = $(this).data('row');
    if (!$(this).hasClass("flip")) {
        $card.addClass('flip');
        select = Game[row];

        if (select == 1) {
            $('.result-one').children((`.card-result[data-row=${One}]`)).removeClass('opacity');
            $card.children(".front-face").addClass('card-one');
            One = One + 1;
        } else if (select == 3) {
            $('.result-three').children((`.card-result[data-row=${Three}]`)).removeClass('opacity');
            $card.children(".front-face").addClass('card-three');
            Three = Three + 1;
        } else if (select == 7) {
            $('.result-seven').children((`.card-result[data-row=${Seven}]`)).removeClass('opacity');
            $card.children(".front-face").addClass('card-seven');
            Seven = Seven + 1;
        }
        Level = Level + 1;
        if (One == 3 || Three == 3 || Seven == 3) {

            const fainalcards = Game;
            win = names[select];
            for (var i = 0; i < 12; i++) {
                const $cell = $(`.card[data-row=${i}]`);
                if (!$cell.hasClass("flip")) {
                    $cell.addClass('flip');
                    if (fainalcards[i] == 1) {
                        $cell.children(".front-face").addClass('card-one opacity');
                    } else if (fainalcards[i] == 3) {
                        $cell.children(".front-face").addClass('card-three opacity');
                    } else if (fainalcards[i] == 7) {
                        $cell.children(".front-face").addClass('card-seven opacity');
                    }
                }
            }
            $('#winModal').modal('toggle');
            document.getElementById("winPrice").innerHTML = 'You win ' + win;
        }
    }
});

$('#winModal').on('hidden.bs.modal', function() {
    reset();
    // do something…
});

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}


function reset() {
    $('.card-result').each(function(i, item) {
        $(item).addClass('opacity');

    });
    for (var i = 0; i < 12; i++) {
        const $cell = $(`.card[data-row=${i}]`);
        $cell.removeClass('flip');
        $cell.addClass('hidden');
        if (Game[i] == 1) {
            $cell.children(".front-face").removeClass('card-one card-three card-seven opacity');
        } else if (Game[i] == 3) {
            $cell.children(".front-face").removeClass('card-one card-three card-seven opacity');
        } else if (Game[i] == 7) {
            $cell.children(".front-face").removeClass('card-one card-three card-seven opacity');
        }

    }
    $('#bet-start').removeClass('disabledbutton');
}