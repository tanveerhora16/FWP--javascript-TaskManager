function TaskManager(){

}
var taskList =[];
var iProgressList =[];
var completeList =[];

TaskManager.prototype.add=function(taskValue,dueDate,status){
	status=false;
	  taskList.push({taskValue, dueDate,status});
	   showTask();
}


TaskManager.prototype.getTask=function(){
	return taskList;
}


TaskManager.prototype.changeStatusByIndex=function(id){
	 if( taskList[id].status==false){
  	 taskList[id].status = true;
  	}
  	else
  		 taskList[id].status = false;
    }


TaskManager.prototype.deleteByIndex=function(id){
    taskList.splice(id,1);
   }



task = new TaskManager();
function addTask(){
	var taskValue =document.getElementById("taskToAdd");
	var dueDate =document.getElementById("dueDate");
	var taskInput=document.getElementById("taskToAdd");
	if(taskValue.value==undefined){
		alert(" Task Should not be empty")
	}else{
       task.add(taskValue.value,dueDate.value);

	}
}

function showTask(){
	task = new TaskManager();
	this.taskList=task.getTask();
    createAndAppendList(taskList);
   
  
}


function createAndAppendList(commonTasks){

	displayCommonData();
	    for (var index = 0; index < commonTasks.length; index++) {
			var element = commonTasks[index];
			dueDate= new Date(element.dueDate);
			computeDays(dueDate);
			var checkBox = this.createCheckBox();
			checkBox.setAttribute("id",index);
            checkBox.setAttribute("name","checkBox");
            var taskTr = document.createElement("tr");
            taskTr.id = index;
            var titleTd = document.createElement("td");
            titleTd.textContent = element.taskValue;
            var dueDateTd = document.createElement("td");
            dueDateTd.textContent = dueDaysValue;
			var taskStatus = document.createElement("td");
			if(element.status==false){
			taskStatus.textContent = "Inprogress";
            }
			if(element.status==true){
			taskStatus.textContent = "Complete";
			}
			titleTd.appendChild(checkBox);
            taskTr.appendChild(titleTd);
            taskTr.appendChild(dueDateTd);
			taskTr.appendChild(taskStatus);
            taskTable.appendChild(taskTr);

}
this.completeList=[];
this.iProgressList=[];
}
var dueDaysValue;
 function computeDays(dueDate){
 	var today = new Date();
	var dueDays=Math.abs(dueDate.getTime()-today.getTime());
	var days=Math.ceil(dueDays/(1000*3600*24));
 	if(days==1){
 		dueDaysValue="Due today";
 	}
 	else
 	{
 		dueDaysValue=days+ "days left";
 	}
 	return dueDaysValue;

		    }
 function createCheckBox(){
        var checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        return checkBox;
    }


function deleteTask() {
     var checkboxes = document.getElementsByName("checkBox");
     for (index = checkboxes.length-1 ; index > -1 ; index--){
         if(checkboxes[index].checked){
            task.deleteByIndex(index);
         }}
        createAndAppendList(taskList);
    }



function changeStatus() {
		var checkboxes = document.getElementsByName("checkBox");
        for (index = 0 ; index<checkboxes.length ; index ++){
         if(checkboxes[index].checked){
            task.changeStatusByIndex(index);
         }}
       createAndAppendList(taskList);

	}



function filterTasks(){
	var filterValue = document.getElementById('filterText');
	if(filterValue.value =="all"){
		showTask();
	}
	else
	if(filterValue.value =="inprogress"){
	this.taskList = task.getTask();
	this.iProgressList;
	for (var index = 0; index < taskList.length; index++) {
		var element = taskList[index];
		if(element.status==false){
			this.iProgressList.push(taskList[index]);
		}
	}
createAndAppendList(this.iProgressList);
	}
	else
	if(filterValue.value =="complete"){
			this.taskList = task.getTask();
	this.completeList;
	for (var index = 0; index < taskList.length; index++) {
		var element = taskList[index];
		if(element.status==true){
			this.completeList.push(taskList[index]);
		}
	}
createAndAppendList(this.completeList);
	}
	
}

function displayCommonData(){
	var taskTable = document.querySelector("table");
        taskTable.innerHTML = "";
	    var taskTr = document.createElement("tr");
		var taskTitle = document.createElement("th");
		var taskDueDate = document.createElement("th");
		var taskStatus = document.createElement("th");
		var checkBox = this.createCheckBox();
		checkBox.setAttribute("id","allCheckBox");		
		checkBox.onclick = checkAllCheckBox; 
		taskTitle.textContent="Title";
		taskDueDate.textContent="Due Date";
		taskStatus.textContent="Task status";
		taskTitle.appendChild(checkBox);
		taskTr.appendChild(taskTitle);
		taskTr.appendChild(taskDueDate);
		taskTr.appendChild(taskStatus);
		taskTable.appendChild(taskTr);
	}	

function checkAllCheckBox(){
	
	var checkboxes = document.getElementsByName("checkBox");
        for (index = 0 ; index<checkboxes.length ; index ++){
        	if(checkboxes[index].checked){
        		checkboxes[index].checked = false;
        	}
        	else{
        		checkboxes[index].checked = true;
        	}
         }

      
}



