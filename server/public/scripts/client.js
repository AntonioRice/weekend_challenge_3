console.log('working');
$(document).ready(function(){

refreshList();

$('#submitButton').on('click', function(){
  addTodo();
});

//delete button funtionality
$('#todoListField').on('click', '.deleteButton', function(){
  var tasksid = $(this).data('tasksid');
  deleteTask(tasksid);
});

//completeTodoButton edit
$('#todoListField').on('click', '.completeTodoButton', function(){
  $(this).parent().parent().addClass('edit');
})


}); //end of doc ready

function refreshList() {
  $.ajax({
    type: 'GET',
    url: '/todolist',
    success: function(response) {
        $('#todoListField').empty();
        appendToDom(response.todolist);
    }
  });
} //end of refresh

function addTodo(){
    var todolist = {
      task: $('#taskIn').val(),
    };
    $.ajax({
      type: "POST",
      url: "/todolist",
      data: todolist,
      success: function(response){
        refreshList();
      }
    });
}//end of addTodo function

function appendToDom(todolist){
  console.log('show tasks');
  $('#todoListField').empty();
  for (var i = 0; i < todolist.length; i++){
    var tasks = todolist[i];
    var tr = $('<tr></tr>');
    tr.data('tasks', tasks );
    tr.append('<td>' + tasks.id +'</td>');
    //console.log(tasks.id);
    tr.append('<td>' + tasks.task +'</td>');
    // console.log(tasks.task);
    tr.append('<td><button class="completeTodoButton"> Complete </button></td>');
    tr.append('<td><button class="deleteButton" data-tasksid="' + tasks.id + '">Delete</button></td>');
    $('#todoListField').append(tr);
  };
  // console.log('loop working');
}//end of appendToDom

function deleteTask(tasksid){
    $.ajax({
      type:'DELETE',
      url:'/todolist/' + tasksid,
      success: function(response){
          refreshList();
      }
    });
}//delete task
