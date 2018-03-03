$(document).ready(function() {
  // -----------------EVENT LISTENERS------------------

  // ----------FOR PROJECTS-----------
  $('.editProject').click(function() {
    var id = $(this).data('id');
    var name = $(`#project-${id} .project-title`)
      .text()
      .trim();
    var description = $(`#project-${id} .project-description`)
      .text()
      .trim();
    var progress = $(`#project-${id} .project-progress`)
      .text()
      .trim()
      .replace(/\D/g, '');
    var target_completion_date = $(`#project-${id} .project-target_completion_date`)
      .text()
      .trim();
    var priority = $(`#project-${id} .project-priority`)
      .text()
      .trim();

    $('#projectEditNameField').val(name);
    $('#projectEditDescriptionField').val(description);
    $('#projectEditProgressField').val(progress);
    $('#projectEditDueDateField').val(target_completion_date);
    $('#projectEditPriorityField').val(priority);

    // Bring up modal containing these two fields
    $('.edit-modal').toggleClass('is-active');
  });

  $('.deleteProject').click(function() {
    var id = $(this).data('id');
    deleteProject(id);
  });

  // The Submit button for the Edit Project modal window must have ID "submitEditedProject"
  $('#submitEditProject').click(function() {
    // The Project Name field must have id "projectEditNameField"
    var id = $(this).data('projectId');
    var object = {
      id: $('#projectEditIdField').val(),
      title: $('#projectEditNameField').val(),
      description: $('#projectEditDescriptionField').val(),
      progress: $('#projectEditProgressField').val(),
      target_completion_date: $('#projectEditDueDateField').val(),
      priority: $('#projectEditPriorityField').val()
    };
    submitEditedProject(object);
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
  });

  // ----------FOR RESOURCES------------

  $('.editResource').click(function() {
    var id = $(this).attr('data-id');
    var title = $(`a#${id}.resourceLink`).text();
    var url = $(`a#${id}.resourceLink`).attr('href');
    var priority = $(`#a${id} .resource-priority`)
    .text()
    .trim();

    // Write title value to title field via $("fieldSelector").val(name)
    console.log('id ', id, 'title ', title, 'url ', url, 'priority ', priority);
    $('#resourceEditTitleField').val(title);
    // Write url value to url field
    $('#resourceEditURLField').val(url);
    // Write priority value to priority field
    $('#resourceEditPriorityField').val(priority);
    // Write id to a hidden(via css of display:hidden) field $("hiddenIdFieldSelector").val(id)
    $('#resourceEditIdNameField').val(id);
    // Bring up modal containing these two fields
    $('.edit-modal').toggleClass('is-active');
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
    // The Resource Title field must have id "resourceEditTitleField"
    // The Resource URL field must have id "resourceEditURLField"
    // The (hidden) Resource ID field must have id "resourceEditIdField"
    var object = {
      id: $('#resourceEditIdField').val(),
      title: $('#resourceEditTitleField').val(),
      url: $('#resourceEditURLField').val(),
      priority: $('$resourceEditPriorityField').val()
    };
    submitEditedResource(object);
  });

  $('.deleteResource').click(function() {
    var id = $(this).attr('data-id');
    deleteResource(id);
    console.log('id is ' + id);
  });

  // ----------FOR MILESTONES------------

  $('.editMilestone').click(function() {
    var id = $(this).attr('data-id');
    var title = $(`p#${id}.milestone-title`).text();
    var projectId = $(this).attr('projectId');
    var description = $(`p#${id}.milestone-description`).val()
    .text()
    .trim();
    var target_completion_date = $(`p#${id}.milestone-target_completion_date`).val()
    .text()
    .trim();
    // Write title value to title field via $("fieldSelector").val(name)
    console.log('id ', id, 'title ', title, 'description ', description, 'target_completion_date ', target_completion_date, 'projectId ', projectId);
    $('#milestoneEditTitleField').val(title);
    // Write description value to description field
    $('#milestoneEditDescriptionField').val(description);
    // Write target completion date value to completion date value field
    $('#milestoneEditCompletionDateField').val(target_completion_date);
    // Write id to a hidden(via css of display:hidden) field $("hiddenIdFieldSelector").val(id)
    $('#milestoneEditIdField').val(id);
    // Write projectId to a hidden(via css of display:hidden) field $("hiddenIdFieldSelector").val(id)
    $('#milestoneEditProjectIdField').val(projectId);
    // Bring up modal containing these two fields
    $('.edit-modal').toggleClass('is-active');
  });

  // THE MODAL FOR SUBMIT NEW MILESTONE HAS TO HAVE A HIDDEN FIELD FOR PROJECTID
  $('#submitNewMilestone').click(function() {
    // The Milestone Title field must have id "milestoneSubmitTitleField"
    // The Milestone URL field must have id "milestoneSubmitURLField"
    var object = {
      title: $('#milestoneSubmitTitleField').val(),
      description: $('#milestoneSubmitDescriptionField').val(),
      target_completion_date: $('#milestoneSubmitCompletionDateField').val()
    };
    var projectId = $('#project-id').val();
    console.log(projectId);
    submitNewMilestone(object, projectId);
  });

  // THE MODAL FOR SUBMIT NEW MILESTONE HAS TO HAVE A HIDDEN FIELD FOR PROJECTID
  // The Submit button for the Edit Milestone modal window must have ID "submitEditedMilestone"
  $('#submitEditedMilestone').click(function() {
    var object = {
      id: $('#milestoneEditIdField').val(),
      title: $('#milestoneEditTitleField').val(),
      description: $('#milestoneEditDescriptionField').val(),
      target_completion_date: $('#milestoneEditCompletionDateField').val()
    };
    submitEditedMilestone(object);
  });

  $('.deleteMilestone').click(function() {
    const id = $(this).data('id');
    deleteMilestone(id);
  });

  //------------------FUNCTIONS--------------------------

  function submitEditedResource(object) {
    $.ajax({
      method: 'PUT',
      url: '/resource/' + object.id,
      data: object
    })
      .done(function(data) {
        location.reload();
      })
      .fail(error => console.log(error));
  }

  function submitEditedMilestone(object) {
    $.ajax({
      method: 'PUT',
      url: '/resource/' + object.id,
      data: object
    })
      .done(function(data) {
        console.log(data);
      })
      .fail(error => console.log(error));
  }

  function submitNewResource(object) {
    $.post('/resource', object, function(data) {
      console.log(data);
    })
      .done(() => location.reload())
      .fail(error => console.log(error));
  }
  function submitNewMilestone(object, projectId) {
    $.post('/milestone/' + projectId, object)
      .done(() => window.location.reload())
      .fail(error => console.log(error));
  }

  function submitNewProject(object) {
    console.log(object);
    $.post('/project', object, function(data) {
      console.log(data);
    })
      .done(() => location.reload())
      .fail(error => console.log(error));
  }

  function submitEditedProject(object) {
    $.ajax({
      method: 'PUT',
      url: '/project/' + object.id,
      data: object
    })
      .done(function(data) {
        window.location.reload();
      })
      .fail(error => console.log(error));
  }

  function deleteProject(id) {
    $.ajax({
      method: 'DELETE',
      url: '/project/' + id
    })
      .done(function() {
        window.location.href = '/dashboard';
      })
      .fail(error => console.log(error));
  }

  function deleteMilestone(id) {
    $.ajax({
      method: 'DELETE',
      url: '/milestone/' + id
    })
      .done(function() {
        window.location.href = '/dashboard';
      })
      .fail(error => console.log(error));
  }

  // function editProject() {
  //     var currentProject = $(this)
  //         .parent();
  //     window.location.href = "/" + currentProject.id
  // }

  function submitResource(Resource) {
    $.post('/resource', Resource, function() {
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

  function submitMilestone(milestone) {
    $.post('/milestone/', milestone)
      .done(() => location.reload())
      .fail(error => console.log(error));
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
    })
      .done(() => location.reload())
      .fail(error => console.log(error));
  }

  // function editMilestone(Milestone) {
  //     var currentMilestone = $(this)
  //         .parent();
  //     window.location.href = "/" + currentMilestone.id
  // }

  // Modal and dropdown handlers
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

  $('.edit-cancel').click(function() {
    $('.edit-modal').toggleClass('is-active');
  });
  $('.dropdown').click(function() {
    $(this).toggleClass('is-active');
  });

  $('.milestone-button').click(function() {
    $('.milestone-modal').toggleClass('is-active');
  });

  $('.milestone-cancel').click(function() {
    $('.milestone-modal').toggleClass('is-active');
  });
});
