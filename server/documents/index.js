module.exports = ({name,college, year, qualification,description ,inst,email,phone,city,edudetailsArr,expdetailsArr,
       duration,  position,  desc,
      title,  link,  projdesc ,
       techSkills, interSkills}) => {
  return `
    <!doctype html>
    <html>
        <head>
            <!-- Font Awesome -->
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css">
            <!-- Bootstrap core CSS -->
            <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
            <!-- Material Design Bootstrap -->
            <link href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.7.5/css/mdb.min.css" rel="stylesheet">

            <style>
              html{
                  zoom: 0.55;
              }    
              .rule{
                border-bottom: 1px solid black;
                width:80%;
              }
              .mobile{
                margin-top:-10px;
              }
              .email{
                margin-bottom: 0;    
              }
              body{
                font-family: 'Garamond';
              }
            </style>
        
        </head>
        <body>

        <div class="col-lg-8 mx-auto">
        <br/><br/>
        <div class="row text-center">
            <div class="col-lg-6">
                <h1><b>${name}</b></h1>
                <p class="lead email"><strong>Email:</strong> ${email}</p>
                <p class="lead"><strong>Contact:</strong> (+91)${phone}</p>
                <p class="lead"><strong>Contact:</strong> (+91)${city}</p>
            </div>    
        </div>
      
        <hr/>
       
        <div class="col-lg-8 mx-auto bg-light">
        <h3><b>Education</b></h3>
      </div>
  ${edudetailsArr ?edudetailsArr.map((edu)=>{
        return(
              `
              <div class="col-lg-8 mx-auto">
              <p class="lead"><b>${edu.college}</b> (${edu.qualification}, ${edu.year})</p>
              <p class="mt-0">${edu.description}</p>
            </div>
              `
        )
  }):``}

            <div class="col-lg-8 mx-auto">
            <p class="lead"><b>${college}</b> (${qualification}, ${year})</p>
            <p class="mt-0">${description}</p>
            </div>

        <div class="col-lg-8 mx-auto bg-light">
              <h3><b>Experience</b></h3>
        </div>
        ${expdetailsArr ?expdetailsArr.map((edu)=>{
            return(
                  `
                  <div class="col-lg-8 mx-auto">
                  <p class="lead"><b>${edu.inst}</b> (${edu.position}, ${edu.duration})</p>
                  <p class="mt-0">${edu.desc}</p>
                </div>
                  `
            )
      }):``}
        <div class="col-lg-8 mx-auto">
              <p class="lead"><b>${inst}, ${position}</b> (${duration} years)</p>
              <p class="mt-0">${desc}</p>
        </div>
     

        
        <div class="col-lg-8 mx-auto bg-light">
              <h3><b>Projects</b></h3>
        </div>
        <div class="col-lg-8 mx-auto">
              <p class="lead"><b>${title}</b>(${link})</p>
              <p class="mt-0">${projdesc}</p>
        </div>
       

        <div class="col-lg-8 mx-auto bg-light">
        <h3><b>Skills</b></h3>
  </div>
  <div class="col-lg-8 row mx-auto">
      <p class="lead"> <b>Technical: </b>${techSkills}</p>
      <p class="lead"> <b>Interpersonal: </b>${interSkills}</p>
  </div>
      
       

      
        
            <!-- JQuery -->
            <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
            <!-- Bootstrap tooltips -->
            <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.4/umd/popper.min.js"></script>
            <!-- Bootstrap core JavaScript -->
            <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.min.js"></script>
            <!-- MDB core JavaScript -->
            <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.7.5/js/mdb.min.js"></script>
        </body>
    </html> 
  `;
}