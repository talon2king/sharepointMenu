function buildLinks(){
         $.ajax({
                url: _spPageContextInfo.webAbsoluteUrl +"/_api/web/lists/getbytitle('menuLinks')/items?$orderby=sortOrder asc",
                type: "GET",
                headers: { "accept": "application/json;odata=verbose" },
                success: function(data) {
                  if (data.d.results) {
                  var object = data.d.results;
                  for (var i = 0; i < object.length; i++) {
                      if(object[i].isMain == true){
                          if(object[i].parentID != null){
                              $('#menuList').append('<li class="dropdown"><a href="'+ object[i].URL +'" class="dropbtn">'+ object[i].Title +'</a><div id="parentCategoryId'+object[i].ID+'" class="dropdown-content"></div></li>');
                            console.log(object[i].ID);
                            }
                          else {
                            $('#menuList').append('<li><a href="'+ object[i].URL +'">'+ object[i].Title +'</a></li>');
                            }
                      }

                  }
                  }
                },
                error: function(xhr, text_status) {
                        alert(xhr.status + ': ' + xhr.statusText);
                }
            });
}

function buildSubMenus(){
$.ajax({
                url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('menuLinks')/items?$orderby=sortOrder asc",
                type: "GET",
                headers: { "accept": "application/json;odata=verbose" },
                success: function(data) {
                  if (data.d.results) {
                  var object = data.d.results;
                  for (var i = 0; i < object.length; i++) {
                    if(object[i].isMain != true){
                      var catID = object[i].parentCategoryId;
                      $('#parentCategoryId'+object[i].parentCategoryId).append('<li><a href="'+ object[i].URL +'">'+ object[i].Title +'</a></li>');
                      console.log('parentCategoryId'+object[i].parentCategoryId);
                      }


                  }
                  }
                },
                error: function(xhr, text_status) {
                        alert(xhr.status + ': ' + xhr.statusText);
                }
            });
}

$(document).ready(function(){
    buildLinks();
    buildSubMenus();
});
