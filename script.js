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






    employeList.addEventListener('click',(e)=>{
        let singleData;
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

    })
    const renderEmployeInfo = (info) =>{
        console.log("Calling rendoEmployeINfo")
        employInfo.innerHTML = `
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
    }
    
    const renderList = () =>{
        

        data.forEach((ele) => {
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

