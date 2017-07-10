if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

var container = document.getElementById('part1');

var hanStart = new Date('1970-01-01');
hanStart.setFullYear(-202);

var items = new vis.DataSet([
  {id: 1, content: '汉朝', start: hanStart, end: '0220-01-01'},
  {id: 2, content: '唐朝', start: '0618-01-01', end: '0907-01-01'},
  {id: 3, content: '宋朝', start: '0960-01-01', end: '1279-01-01'},
  {id: 4, content: '元朝', start: '1260-01-01', end: '1368-01-01'},
  {id: 5, content: '明朝', start: '1368-01-01', end: '1644-01-01'},
  {id: 6, content: '清朝', start: '1636-01-01', end: '1912-01-01'}
]);

var options = {
  showCurrentTime: false
};

var timeline = new vis.Timeline(container, items, options);

function selectImageById(sid) {
  $('#content .item').hide();
  console.log('#content .item[data-sid="{0}"]'.format(sid));
  $('#content .item[data-sid="{0}"]'.format(sid)).show();
}

timeline.on('select', function(properties) {
  if (properties.items.length > 0) {
    timeline.focus(properties.items[0]);
    selectImageById(properties.items[0]);
  } else {
    timeline.fit();
    selectImageById(0);
  }
});

$('#btnPrev').click(function() {
  var sid = timeline.getSelection();
  if (sid.length === 0) {
    sid = items.length;
  } else {
    sid = sid[0];
    sid = sid - 1;
  }
  if (sid <= 0) {
    timeline.setSelection([]);
    timeline.fit();
    selectImageById(0);
  } else {
    timeline.setSelection(sid);
    timeline.focus(sid);
    selectImageById(sid);
  }
});

$('#btnNext').click(function() {
  var sid = timeline.getSelection();
  if (sid.length === 0) {
    sid = 1;
  } else {
    sid = sid[0];
    sid = sid + 1;
  }
  if (sid > items.length) {
    timeline.setSelection([]);
    timeline.fit();
    selectImageById(0);
  } else {
    timeline.setSelection(sid);
    timeline.focus(sid);
    selectImageById(sid);
  }
});
