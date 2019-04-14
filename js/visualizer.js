$(document).ready(
    function(){

    }
)

function sensorInfo(sensor_image,color,desc,dataset){
    var x=document.getElementById("content");
    x.innerHTML="
    <div class="container-fluid">
    <div class="row">
        <div class="col-4">
            <div class="card">
                <img class="card-img-top" style="background-color:red" src="../assets/Play.svg" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">Luz</h5>
                    <p class="card-text">Actual: 15g</p>
                </div>
            </div>
        </div>
        <div class="col-8">
            chart
        </div>
    </div>
    <span> Descripcion </span>
</div>
    "
}