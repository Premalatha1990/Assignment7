var title;
var to_be_updated;

        $(document).ready(function() {
            $('#myTable').DataTable();
            });
        // edit data

        $('.update').click(function() {
        
            id = this.id;

        //     function checkDate() {
            
        //       var newDate = new Date($("#update_date").val());
  
        //       var date = newDate.substring(0, 2);
        //       var month = newDate.substring(3, 5);
        //       var year = newDate.substring(6, 10);
  
        //       var myDate = new Date(year, month - 1, date);
  
        //       var currentDate = new Date();
  
        //       if (myDate > currentDate) {
        //           alert("Entered date is greater than today's date ");
        //       }
        //       elseif {
        //           alert("Entered date is less than today's date ");
        //       }
        //  }
            
                $.ajax({
                    type: 'POST',
                    url: '/find_by_name',
                    data: {"title":id},
          
                    success: function(data){
                            to_be_updated = data[0].title;
                            $("#update_title").attr("value", data[0].title);
                            $("#update_description").attr("value", data[0].description);
                            $("#update_date").attr("value", data[0].date);
                            $("#update_assignee").attr("value", data[0].assignee);
                            $('#Modal').modal({show: true});
                        },
                    error: function(){
                        alert('No data');
                    }
                    });
            });

        


            
            // update data
                  $(function(){
                      $('#update_table').on('click', function(e){
                        console.log('i am indsd');
                        var data = $('#update_user').serialize();
                        debugger;
                        console.log(JSON.stringify(data));
                        e.preventDefault();
                        $.ajax({
                          url: '/update_user',
                          type:'PUT',
                          data : data,
                          success: function(data){
                            console.log('i am googleapis');
                            window.location.reload()
                        },
                        error: function(){
                          alert('No data');
                        }
                      });
                  });
                  });