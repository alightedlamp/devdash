function submitLogin() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value

    console.log("Name: " + document.getElementById("email").value + " " + "Password: " + document.getElementById("password").value)
}

function submitProject(Project) {
    $.post("/api/project/", Project, function () {
        window.location.href = "/";
    });
}

function deleteProject(id) {
    $.ajax({
        method: "DELETE",
        url: "/api/project/" + id
    })
    .then(function() {
        window.location.href = "/";
    });
}

function editProject() {
    var currentProject = $(this)
        .parent();
    window.location.href = "/" + currentProject.id
}

function submitResource(Resource) {
    $.post("/api/resource/", Resource, function () {
        window.location.href = "/";
    });
}

function handleResourceEdit() {
    var currentResource = $(this)
    .parent()
    .parent()
    .data("resource");
    window.location.href = "/api/resource?_id=" + currentResource.id;
}

function handleDeleteResource() {
    var currentResource = $(this)
        .parent();
    deleteResource(currentResource.id);
}

function deleteResource(id) {
		$.ajax({
			method: "DELETE",
			url: "/api/resource/" + id
		})
		.then(function() {
		
		});
}

function editResource() {
    var currentResource = $(this)
        .parent();
    window.location.href = "/" = currentResource.id
}

function submitMilestone(Milestone) {
    $.post("/api/milestone/", Milestone, function () {
        window.location.href = "/bulmaDashboard.html";
    });
}

function handleDeleteMilestone() {
    var currentMilestone = $(this)
        .parent()
        .parent()
        .data("Milestone");
    deleteMilestone(currentMilestone.id);
}

function deleteMilestone(id) {
    $.ajax({
        method: "DELETE",
        url: "/api/milestone/" + id
    })
    .then(function() {
        
    });
}
function editMilestone(Milestone) {
    var currentMilestone = $(this)
        .parent();
    window.location.href = "/" + currentMilestone.id
}