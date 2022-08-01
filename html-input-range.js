const inputRange = $("#html-input-range");
let htmlInputRange = {
  idNotThere: "<p>Note: Missing input tag id name e.g html-input-range</p>",
  init() {
    if (inputRange.length > 0) {
      let inputRanges = $("#html-input-range");
      inputRanges.parent().addClass("html-inupt-range");
      // if too many input ranges there for now hiding this part.
      // inputRanges.each(function( index ) {
      //   let $this = $(this);
      // });
      let $this = inputRanges;
      // default input range starts at 0 and ends at 100
      $this.attr({
        min: 1,
        max: 10,
        value: 5,
        step: 0.5,
      });
    } else {
      $("input[type=range]").parent().append(htmlInputRange.idNotThere);
    }
  },
  options(inputs) {
    htmlInputRange.init();
    let options = inputs;
    // custom tracker
    $("input[type=range]").parent().addClass("html-input-range-custom");
    $("input[type=range]")
      .parent()
      .append(
        '<div class="hir-tracker-bg"></div><div class="hir-tracker-thumb"></div>'
      );
    let min = 1;
    let max = 10;
    if (options.tooltip === true) {
      if (options.max) {
        max = options.max;
        $(inputRange).attr({
          max: options.max,
        });
      }
      $("input[type=range]")
        .parent()
        .append('<div class="tooltip">' + min + "</div>");
    }
    if (options.labels === true) {
      $(inputRange).parent().append('<ul class="hir-labels"></ul>');
      let setWidth;
      if (options.max) {
        setWidth = options.max / 10;
      } else {
        setWidth = max / 10;
      }
      for (let i = 0; i < setWidth; i++) {
        $(".hir-labels").append('<li class="col-' + setWidth + ' "></li>');
      }
    }
  },
};

$(inputRange).on("input change", inputRange, function (e) {
  /*
   * splitting 100 by input range max value
   * for active tracker and tooltip position.
   */
  let inputMax = 10 / inputRange.attr("max");
  let trackerTooltipMove = inputRange.val() * inputMax;
  $(".html-inupt-range .tooltip").css("left", trackerTooltipMove + "%");
  $(".html-input-range-custom .hir-tracker-thumb").css(
    "width",
    trackerTooltipMove + "%"
  );
  // updating tooltip value based on the range from to.
  $(".html-inupt-range .tooltip").text(inputRange.val());
});
