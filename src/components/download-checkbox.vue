<template>
    <label>
        <input type="checkbox" name="" :checked="isChecked" @input="onInput" />
        <div class="check"></div>

        <slot></slot>
    </label>
</template>

<script>
export default {
    props: {
        name: String,
        value: Array
    },
    data: () => ({
        checked: false
    }),
    computed: {
        isChecked() {
            return this.value.includes(this.name)
        }
    },
    methods: {
        onInput($event) {
            const newValue = $event.target.checked
                ? [...this.value, this.name]
                : this.value.filter(v => v !== this.name)
            
            this.$emit('input', newValue)
        }
    }
}
</script>

<style scoped>
label {
    display: block;
    margin: 10px 0;
}

input {
    position: absolute;
    visibility: hidden;
    opacity: 0;
}

.check {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    margin-right: 10px;
    transition: all 0.2s;
    text-align: center;
    vertical-align: middle;
}

label:hover .check {
    background: rgba(255, 255, 255, 0.15);
}

.check::before {
    font-family: 'Font Awesome 5 Free';
    content: '\f00c';
    font-size: 10px;
    vertical-align: middle;
    opacity: 0;
    transition: all 0.2s;
}

input:checked+.check::before {
    opacity: 1;
}
</style>