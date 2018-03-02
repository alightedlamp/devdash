$(document).ready(function() {
  // -----------------EVENT LISTENERS------------------

  // ----------FOR PROJECTS-----------
  $('.editProject').click(function() {
    var id = $(this).attr('data-id');
    var name = $('p.projectTitle#' + id).text();
    // Write name value to name field via $("fieldSelector").val(name)
    $('#projectEditNameField').val(name);
    // Write id to a hidden(via css of display:hidden) field $("hiddenIdFieldSelector").val(id)
    $('#projectEditIdField').val(id);
    // Bring up modal containing these two fields
  });

  $('.deleteProject').click(function() {
    var id = $(this).attr('data-id');
    deleteProject(id);
    console.log('id is ' + id);
  });

  // The Submit button for the Edit Project modal window must have ID "submitEditedProject"
  $('#submitEditedProject').click(function() {
    // The Project Name field must have id "projectEditNameField"
    // The (hidden) Project ID field must have id "projectEditIdField"
    var object = {
      id: $('#projectEditIdField').val(),
      title: $('#projectEditNameField').val()
    };
    submitEditedProject(object);
    $('#projectEditIdField').val('');
    $('#projectEditNameField').val('');
  });

  // The Submit button for the Add Project modal window must have ID "submitNewProject"
  $('#submitNewProject').click(function() {
    // The Project Name field must have id "projectSubmitNameField"
    var object = {
      title: $('#projectSubmitNameField')
        .val()
        .trim(),
      description: $('#projectSubmitDescriptionField')
        .val()
        .trim(),
      progress: $('#projectSubmitProgressField')
        .val()
        .trim(),
      target_completion_date: $('#projectSubmitDueDateField')
        .val()
        .trim(),
      priority: $('#projectSubmitPriorityField').val()
    };
    submitNewProject(object);
    $('#projectSubmitNameField').val('');
  });

  // ----------FOR RESOURCES------------

  $('.editResource').click(function() {
    var id = $(this).attr('data-id');
    var title = $(`a#${id}.resourceLink`).text();
    var url = $(`a#${id}.resourceLink`).attr('href');
    // Write title value to title field via $("fieldSelector").val(name)
    console.log('id ', id, 'title ', title, 'url ', url);
    $('#resourceTitleEditField').val(title);
    // Write url value to url field
    $('#resourceURLEditField').val(url);
    // Write id to a hidden(via css of display:hidden) field $("hiddenIdFieldSelector").val(id)
    $('#resourceIdEditNameField').val(id);
    // Bring up modal containing these two fields
  });

  $('#submitNewResource').click(function() {
    // The Resource Title field must have id "ResourceSubmitTitleField"
    // The Resource URL field must have id "ResourceSubmitURLField"
    var object = {
      title: $('#resourceSubmitTitleField')
        .val()
        .trim(),
      url: $('#resourceSubmitURLField')
        .val()
        .trim(),
      priority: $('#resourceSubmitPriorityField')
        .val()
        .trim()
    };
    console.log(object);
    submitNewResource(object);
  });

  // The Submit button for the Edit Resource modal window must have ID "submitEditedResource"
  $('#submitEditedResource').click(function() {
    // The Resource Title field must have id "ResourceEditTitleField"
    // The Resource URL field must have id "ResourceEditURLField"
    // The (hidden) Resource ID field must have id "ResourceEditIdField"
    var object = {
      id: $('#ResourceEditIdField').val(),
      title: $('#ResourceEditTitleField').val(),
      url: $('#ResourceEditURLField').va(),
      priority: ''
    };
    submitEditedResource(object);
    $('#ResourceEditIdField').val('');
    $('#ResourceEditTitleField').val('');
    $('#ResourceEditURLField').val('');
  });

  $('.deleteResource').click(function() {
    var id = $(this).attr('data-id');
    deleteResource(id);
    console.log('id is ' + id);
  });

  // ----------FOR MILESTONES------------

  $('.editMilestone').click(function() {
    var id = $(this).attr('data-id');
    var title = $(`p#${id}.milestoneTitle`).text();
    var projectId = $(this).attr('projectId');
    // Write title value to title field via $("fieldSelector").val(name)
    console.log('id ', id, 'title ', title, 'projectId ', projectId);
    $('#milestoneTitleEditIdField').val(title);
    // Write id to a hidden(via css of display:hidden) field $("hiddenIdFieldSelector").val(id)
    $('#milestoneIdEditField').val(id);
    // Write projectId to a hidden(via css of display:hidden) field $("hiddenIdFieldSelector").val(id)
    $('#milestoneProjectIdEditField').val(projectId);
    // Bring up modal containing these two fields
  });

  // THE MODAL FOR SUBMIT NEW MILESTONE HAS TO HAVE A HIDDEN FIELD FOR PROJECTID
  $('#submitNewMilestone').click(function() {
    // The Resource Title field must have id "ResourceSubmitTitleField"
    // The Resource URL field must have id "ResourceSubmitURLField"
    var object = {
      title: $('#milestoneSubmitTitleField').val(),
      target_completion_date: ''
    };
    var id = $('#milestoneSubmitProjectIdField').val();
    submitNewMilestone(object, projectId);
    $('#milestoneSubmitTitleField').val('');
    $('#milestoneSubmitProjectIdField').val('');
  });

  // THE MODAL FOR SUBMIT NEW MILESTONE HAS TO HAVE A HIDDEN FIELD FOR PROJECTID
  // The Submit button for the Edit Milestone modal window must have ID "submitEditedMilestone"
  $('#submitEditedMilestone').click(function() {
    var object = {
      id: $('#milestoneEditIdField').val(),
      title: $('#milestoneEditTitleField').val(),
      target_completion_date: ''
    };
    var projectId = submitEditedMilestone(object);
    $('#milestoneEditIdField').val('');
    $('#milestoneEditTitleField').val('');
  });

  $('.deleteMilestone').click(function() {
    var id = $(this).attr('data-id');
    deleteMilestone(id);
    console.log('id is ' + id);
  });

  //------------------FUNCTIONS--------------------------

  function submitEditedResource(object) {
    $.ajax({
      method: 'PUT',
      url: '/resource/' + object.id,
      data: object
    }).done(function(data) {
      console.log(data);
    });
  }

  function submitEditedMilestone(object) {
    $.ajax({
      method: 'PUT',
      url: '/resource/' + object.id,
      data: object
    }).done(function(data) {
      console.log(data);
    });
  }

  function submitNewResource(object) {
    $.post('/resource', object, function(data) {
      console.log(data);
    }).then(() => location.reload());
  }
  function submitNewMilestone(object, projectId) {
    $.post('/milestone/' + projectId, object, function(data) {
      console.log(data);
    });
  }

  function submitNewProject(object) {
    console.log(object);
    $.post('/project', object, function(data) {
      console.log(data);
    }).done(() => location.reload());
  }

  function submitEditedProject(object) {
    $.ajax({
      method: 'PUT',
      url: '/project/' + object.id,
      data: object
    }).done(function(data) {
      console.log(data);
    });
  }

  function deleteProject(id) {
    $.ajax({
      method: 'DELETE',
      url: '/project/' + id
    }).then(function() {
      window.location.href = '/dashboard';
    });
  }

  function deleteMilestone(id) {
    $.ajax({
      method: 'DELETE',
      url: '/milestone/' + id
    }).then(function() {
      window.location.href = '/dashboard';
    });
  }

  // function editProject() {
  //     var currentProject = $(this)
  //         .parent();
  //     window.location.href = "/" + currentProject.id
  // }

  function submitResource(Resource) {
    $.post('/api/resource/', Resource, function() {
      window.location.href = '/dashboard';
    });
  }

  // function handleResourceEdit() {
  //     var currentResource = $(this)
  //     .parent()
  //     .parent()
  //     .data("resource");
  //     window.location.href = "/api/resource?_id=" + currentResource.id;
  // }

  // function handleDeleteResource() {
  //     var currentResource = $(this)
  //         .parent();
  //     deleteResource(currentResource.id);
  // }

  function deleteResource(id) {
    $.ajax({
      method: 'DELETE',
      url: '/resource/' + id
    }).then(function(data) {
      console.log(data);
    });
  }

  // function editResource() {
  //     var currentResource = $(this)
  //         .parent();
  //     window.location.href = "/" = currentResource.id
  // }

  function submitMilestone(Milestone) {
    $.post('/api/milestone/', Milestone, function() {
      window.location.href = '/bulmaDashboard.html';
    });
  }

  // function handleDeleteMilestone() {
  //     var currentMilestone = $(this)
  //         .parent()
  //         .parent()
  //         .data("Milestone");
  //     deleteMilestone(currentMilestone.id);
  // }

  function deleteMilestone(id) {
    $.ajax({
      method: 'DELETE',
      url: '/milestone/' + id
    }).then(function() {});
  }

  // function editMilestone(Milestone) {
  //     var currentMilestone = $(this)
  //         .parent();
  //     window.location.href = "/" + currentMilestone.id
  // }

  $('.dropdown').click(function() {
    $(this).toggleClass('is-active');
  });
  $('.fa-angle-down').click(function() {
    $(this)
      .closest('.card-content')
      .toggleClass('is-active');
  });

  $('.resource-button').click(function() {
    $('.resource-modal').toggleClass('is-active');
  });

  $('.resource-cancel').click(function() {
    $('.resource-modal').toggleClass('is-active');
  });

  $('.project-button').click(function() {
    $('.project-modal').toggleClass('is-active');
  });

  $('.project-cancel').click(function() {
    $('.project-modal').toggleClass('is-active');
  });

  $('.edit').click(function() {
    $('edit-modal').toggleClass('is-active');
  });

  $('.edit-cancel').click(function() {
    $('.edit-modal').toggleClass('is-active');
  });
});
