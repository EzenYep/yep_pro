<template>
<div class="container">
  <!-- Content here -->
  <div class="Complaint">
  고객센터
  <hr>
</div>
<div class="often">
  자주 찾는 질문
  <hr>
</div>

<div class="accordion" id="accordionPanelsStayOpenExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
        고객이 자주 찾는 질문
      </button>
    </h2>
    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse " aria-labelledby="panelsStayOpen-headingOne">
      <div class="accordion-body">
        <strong>고객이 자주 찾는 질문</strong>  <code> </code>
      </div>
    </div>
  </div>
</div>
<div class="accordion" id="accordionPanelsStayOpenExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
        고객이 자주 찾는 질문
      </button>
    </h2>
    <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse s" aria-labelledby="panelsStayOpen-headingTwo">
      <div class="accordion-body">
        <strong>고객이 자주 찾는 질문</strong>   <code></code>
      </div>
    </div>
  </div>
</div>
<div class="accordion" id="accordionPanelsStayOpenExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpen-headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="true" aria-controls="panelsStayOpen-collapseThree">
        고객이 자주 찾는 질문
      </button>
    </h2>
    <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
      <div class="accordion-body">
        <strong>고객이 자주 찾는 질문</strong>  <code></code>
      </div>
    </div>
  </div>
</div>
<div class="accordion" id="accordionPanelsStayOpenExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpen-headingFour">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="true" aria-controls="panelsStayOpen-collapseFour">
       고객이 자주 찾는 질문
      </button>
    </h2>
    <div id="panelsStayOpen-collapseFour" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFour">
      <div class="accordion-body">
        <strong>고객이 자주 찾는 질문</strong>  <code></code>
      </div>
    </div>
  </div>
</div>
<div class="accordion" id="accordionPanelsStayOpenExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpen-headingFive">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFive" aria-expanded="true" aria-controls="panelsStayOpen-collapseFive">
       고객이 자주 찾는 질문
      </button>
    </h2>
    <div id="panelsStayOpen-collapseFive" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFive">
      <div class="accordion-body">
        <strong>고객이 자주 찾는 질문</strong>  <code></code>
      </div>
    </div>
  </div>
</div>
</div>

</template>

<script scoped>
export default {
  name: 'HelloWorld',
    data() {
        return {
           
            }
    }, 

    methods: {
        showText() {
     
        }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only --> 
<style scoped>
.container {
    width: 100%;
   
    
    }
    .accordion-item {
    
       margin: 3rem;
        margin-top: 3%;
         margin-bottom: 3%;
       
      }
      .Complaint {
        text-align: left;
        font-size: 2rem;
        position: relative;
        margin: 5%;
        margin-bottom: 5%;
        }

      .often {
         text-align: left;
        font-size: 1rem;
        position: relative;
        margin-top: 3%;
        margin: 2%;
        
      }
      
     
     
</style>

