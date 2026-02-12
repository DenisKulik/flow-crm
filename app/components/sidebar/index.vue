<script setup lang="ts">
import { menuItems } from '@/data'
</script>

<template>
  <UiSidebar>
    <UiSidebarContent>
      <UiSidebarGroup>
        <UiSidebarGroupLabel>Flow CRM</UiSidebarGroupLabel>
        <UiSidebarGroupContent>
          <SidebarMenuList :items="menuItems" />
        </UiSidebarGroupContent>
      </UiSidebarGroup>
    </UiSidebarContent>
    <UiSidebarFooter>
      <SidebarUserDropdown />
    </UiSidebarFooter>
  </UiSidebar>
</template>
