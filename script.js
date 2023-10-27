let html = document.querySelector('html')
let body = document.querySelector("body")
let theme_btn = document.querySelector('.theme')
let all_tasks = document.querySelectorAll('.task_item')
let tasks_count = all_tasks.length
let filter_form = document.querySelector('.tasks_footer')
let add_task_header_text = document.querySelector('.add_task_header').querySelector('p')
let tasks_containter = document.querySelector('.tasks-containter')
html.style.setProperty('--current_theme', "dark")
theme_btn.addEventListener('click', () => {
    if (html.style.getPropertyValue('--current_theme') == "dark") {
        // light
        html.style.setProperty('--bg_color', "var(--bg_color_light)")
        html.style.setProperty('--theme_button', "var(--theme_button_light)")
        html.style.setProperty('--bg_task', 'var(--bg_task_light)')
        html.style.setProperty('--current_theme', "light")
        html.style.setProperty('--task_block_shadow', 'var(--task_block_shadow_light)')
        html.style.setProperty('--tasks_block_bg_color', 'var(--tasks_block_bg_color_light)')
        html.style.setProperty('--add_task_header_text_color', 'var(--add_task_header_text_color_light)')
    } else {
        //dark
        html.style.setProperty('--current_theme', "dark")
        html.style.setProperty('--bg_color', "var(--bg_color_dark)")
        html.style.setProperty('--theme_button', "var(--theme_button_dark)")
        html.style.setProperty('--bg_task', 'var(--bg_task_dark)')
        html.style.setProperty('--task_block_shadow', 'var(--task_block_shadow_dark)')
        html.style.setProperty('--tasks_block_bg_color', 'var(--tasks_block_bg_color_dark)')
        html.style.setProperty('--add_task_header_text_color', 'var(--add_task_header_text_color_dark)')
    }
})


let create_task_form = document.querySelector('.new_task_form')
let create_task_layout = document.querySelector('.new_task_layout')
let tasks_block = document.querySelector('.tasks-containter')
create_task_form.addEventListener('submit', (event) => {
    create_task_layout.style.display = "none"
    let newelem = document.createElement('div')
    newelem.classList.add('task_item')
    let inp = document.createElement(`input`)
    console.dir(inp)
    inp.id = `task${all_tasks.length + 1}`
    inp.type = "checkbox"
    let lab = document.createElement(`label`)
    lab.setAttribute('for', `task${all_tasks.length + 1}`)
    let text = document.createElement('p')
    let taskdescription = create_task_form.querySelector('input')
    text.innerHTML = taskdescription.value
    let radionbutton = create_task_form.querySelector('input[name="category"]:checked')
    let category = document.createElement(`div`)
    category.classList.add('item_category')
    category.classList.add(`${radionbutton.value}`)
    newelem.append(inp)
    newelem.append(lab)
    newelem.append(text)
    newelem.append(category)
    tasks_block.append(newelem)
    updateTaskHeaderText()
    event.preventDefault()
})


filter_form.addEventListener('change', () => {
    let active_filter = filter_form.querySelector("input:checked")
    console.dir(active_filter)
    for (const task of all_tasks) {
        let task_category = task.querySelector('.item_category')
        switch (active_filter.value) {
            case "active":
                if (task_category.classList.contains('completed')) {
                    console.log('hellow')
                    task.style.display = "none"
                } else {
                    task.style.display = "flex"
                }
                break;
            case "all":
                task.style.display = "flex"
                break;
            case "completed":
                if (!task_category.classList.contains('completed')) {
                    task.style.display = "none"
                }
                else {
                    task.style.display = "flex"
                }
                break;
        }
    }
})

let clear_complited_button = document.querySelector('.add_task_header>button:nth-of-type(2)')
clear_complited_button.addEventListener('click', (event) => {
    for (const task of all_tasks) {
        let category = task.querySelector('.item_category')
        if (category.classList.contains('completed')) {
            const parent = task.parentNode
            parent.removeChild(task)
        }
    }
    updateTaskHeaderText()
})



let new_task_button = document.querySelector('.add_task_header>button:nth-of-type(1)')
new_task_button.addEventListener('click', (event) => {
    create_task_layout.style.setProperty('display', 'block')
})


function updateTasks() {
    all_tasks = document.querySelectorAll('.task_item');
    tasks_count = all_tasks.length
    for (let i = 0; i< all_tasks.length; i++) {
        let task = all_tasks[i]
        console.log(task)
        let inp = task.querySelector('input')
        let label = task.querySelector('label')
        console.log(label)
        inp.id = `task${i+1}` 
        label.setAttribute('for',`task${i+1}`)
    }
}

function updateTaskHeaderText() {
    updateTasks()
    add_task_header_text.innerHTML = `${tasks_count} tasks`
}

let categories = document.querySelectorAll('.sidebar_categories>.category_item')
for (const category of categories) {
    category.addEventListener('click', event => {
        console.log(event.target.dataset.value)
        for (const task of all_tasks) {
            let task_category = task.querySelector('.item_category')
            if (!task_category.classList.contains(event.target.dataset.value)) {
                task.style.display = "none"
            } else {
                task.style.display = "flex"
            }
        }
        let active_filter = filter_form.querySelector("input:checked")
        active_filter.checked = false;
    })
}