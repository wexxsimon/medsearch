<template>
    <div class="search-background full-height">
        <PageHeader />
        <div class="container-fluid">
            <slot></slot>
        </div>
        <PageFooter />
    </div>
</template>
<style>
.search-background {
    background: rgb(11, 123, 208);
    background:
        linear-gradient(0deg, rgba(11, 123, 208, 0.4150035014005602) 0%,
            rgba(255, 255, 255, 1) 34%, rgba(255, 255, 255, 1) 100%);
    background-repeat: no-repeat;
}

.full-height {
    height: 100vh;
}
</style>
