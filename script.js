var data;
(async function(){
    const res = await fetch('./data.json')
    data = await res.json();
    // console.log(data);
    let employeList = document.getElementById('employeList')
    let employInfo = document.getElementById('employInfo')

    // Add Employee 

    // Container Show krne k liye
    const addEmployeeModal = document.querySelector(".addEmployee") 
    // add employe button 
    const createEmploye = document.querySelector(".createEmployee") 

    // form submit button
    const addEmployeeForm = document.querySelector(".addEmployee_create")

    createEmploye.addEventListener("click",()=>{
        addEmployeeModal.style.display = "flex";
    })
    addEmployeeModal.addEventListener("click",(e)=>{
        if(e.target.className === "addEmployee"){
            addEmployeeModal.style.display = "none";
        }
    })
    addEmployeeForm.addEventListener("submit",(e)=>{
        e.preventDefault();
        const formData = new FormData(addEmployeeForm);
        const values = [...formData]
        console.log(values);
        let employeData = {}

        values.forEach((value)=>{
            employeData[value[0]] = value[1];
        })
        employeData.id = Math.random(3)*10000 ||data[data.length-1].id+1 || 1000;
        employeData.imageUrl = employeData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png";
        console.log(employeData)
        data.push(employeData);
        console.log(data[data.length-1]);
        addEmployeeModal.style.display = "none";
        renderList();
        addEmployeeForm.reset();
    })






    let singleData;
    employeList.addEventListener('click',(e)=>{

        if(e.target.tagName === 'SPAN' && e.target.id != singleData?.id){            
            e.target.classList.add('selected');
            data.forEach((d)=>{
                if(e.target.id == d.id)
                {
                    singleData =  d;
                }
            })
            renderEmployeInfo(singleData);
        }

        if(e.target.tagName === 'I'){
            let prevEmp = e.target.parentNode.id;
            data = data.filter((emp) => String(emp.id) !== e.target.parentNode.id);
            
            // console.log(singleData)
            if(singleData){
                // console.log(prevEmp , " -- ",singleData.id)
                if(prevEmp == singleData.id){
                    renderEmployeInfo(data[0])
                }
                else {
                    renderEmployeInfo(singleData)
                }
            }
            else {
                renderEmployeInfo(data[0])
                singleData = data[0];

            }
            employeList.innerHTML = "";
            renderList();
        }

        

    })
    const renderEmployeInfo = (info  ) => {
        // console.log("Calling rendoEmployeINfo")
        if(info)employInfo.innerHTML = `
        <div class="emp--info__container">
            <img  src="${info.imageUrl}" class="employe-img" width="50px" />
            <p class="emp--name">
                <span>${info.firstName}</span>
                <span>${info.lastName}</span>
            </p>
            <span>DOB - ${info.dob}</span>
            <span>${info.email}</span>
            <span>Contact No. - ${info.contactNumber}</span>
            <span>Address - ${info.address}</span>
            <span>Salary - ${info.salary}</span>
            <span>Age - ${info.age}</span>
        </div>
        `
        else employInfo.innerHTML = `<h2>No Data Found</h1>`
    }
    renderEmployeInfo(data[0] || [])
    
    const renderList = () =>{
        data?.forEach((ele) => {
            const employe = document.createElement('span');
            employe.classList.add('employe--name')
            employe.innerHTML = `${ele.firstName} ${ele.lastName} <i class="delete--btn">❌</i> `
            employe.setAttribute("id",ele.id);
            // console.log(employe)
            employeList.append(employe);
        });
    }
    renderList();
})()

