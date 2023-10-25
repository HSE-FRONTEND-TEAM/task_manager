let html = document.querySelector('html')
let body = document.querySelector("body")
let theme_btn = document.querySelector('.theme')
html.style.setProperty('--current_theme', "dark")
theme_btn.addEventListener('click', () => {
    if (html.style.getPropertyValue('--current_theme') == "dark") {
        // light
        html.style.setProperty('--bg_color', "var(--bg_color_light)")
        html.style.setProperty('--theme_button', "var(--theme_button_light)")
        html.style.setProperty('--bg_task', 'var(--bg_task_light)')
        html.style.setProperty('--current_theme', "light")
        html.style.setProperty('--task_block_shadow','var(--task_block_shadow_light)')
        html.style.setProperty('--tasks_block_bg_color','var(--tasks_block_bg_color_light)')
    } else {
        //dark
        html.style.setProperty('--current_theme', "dark")
        html.style.setProperty('--bg_color', "var(--bg_color_dark)")
        html.style.setProperty('--theme_button', "var(--theme_button_dark)")
        html.style.setProperty('--bg_task', 'var(--bg_task_dark)')
        html.style.setProperty('--task_block_shadow','var(--task_block_shadow_dark)')
        html.style.setProperty('--tasks_block_bg_color','var(--tasks_block_bg_color_dark)')
    }
})

let create_task_form = document.querySelector('.new_task_form')
let create_task_layout = document.querySelector('.new_task_layout')
create_task_form.addEventListener('submit', (event) => {
    create_task_layout.style.display = "none"
    let newElem = document.createElement('h1')
    newElem.style.color = "white"
    let taskDescription = create_task_form.querySelector('input')
    let radionButton = create_task_form.querySelector('input[name="category"]:checked')
    newElem.innerHTML = `${taskDescription.value}, type= ${radionButton.value}`
    body.append(newElem)
    event.preventDefault()
})