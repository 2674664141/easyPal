<template>
  <section class="rounded-xl bg-card border border-border p-4">
    <div class="flex items-center gap-2 mb-2">
      <span class="text-destructive text-sm">◌</span>
      <h3 class="text-base font-semibold">危机风险分布</h3>
    </div>
    <p class="text-xs text-muted-foreground mb-4">当前用户风险等级分布情况</p>

    <div class="space-y-3">
      <div>
        <div class="flex items-center justify-between text-xs mb-1">
          <span>低风险</span>
          <span>2650人 (93%)</span>
        </div>
        <div class="h-2 rounded-full bg-muted overflow-hidden">
          <div class="h-full w-[93%] bg-success rounded-full"></div>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between text-xs mb-1">
          <span>中风险</span>
          <span>180人 (6.3%)</span>
        </div>
        <div class="h-2 rounded-full bg-muted overflow-hidden">
          <div class="h-full w-[6.3%] bg-warning rounded-full"></div>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between text-xs mb-1">
          <span>高风险</span>
          <span>17人 (0.6%)</span>
        </div>
        <div class="h-2 rounded-full bg-muted overflow-hidden">
          <div class="h-full w-[0.6%] bg-destructive rounded-full"></div>
        </div>
      </div>
    </div>

    <div class="mt-4 rounded-lg bg-muted/70 p-3 flex items-center justify-between">
      <div>
        <p class="text-sm font-medium">本周干预建议</p>
        <p class="text-xs text-muted-foreground mt-0.5">17位高风险用户需要关注</p>
      </div>
      <button class="h-8 px-3 rounded-md bg-primary text-primary-foreground text-xs">查看详情</button>
    </div>
  </section>
</template>
