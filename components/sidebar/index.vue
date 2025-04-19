<script setup lang="ts">
import { MENU_ITEMS } from '@/constants'
</script>

<template>
  <UiSidebar>
    <UiSidebarContent>
      <UiSidebarGroup>
        <UiSidebarGroupLabel>Flow CRM</UiSidebarGroupLabel>
        <UiSidebarGroupContent>
          <SidebarMenuList :items="MENU_ITEMS" />
        </UiSidebarGroupContent>
      </UiSidebarGroup>
    </UiSidebarContent>
    <UiSidebarFooter>
      <SidebarUserDropdown />
    </UiSidebarFooter>
  </UiSidebar>
</template>
