export type Action = {
    /** Internal ID of the action  */
	id: string
    /** Text which will be shown in the list UI  */
	text: string
    /**
     * Hanlder which will be called when the action is selected
     * 
     * If the action accepts inputs the value will be passed as the parameter
     */
	action?: (value?: string | Action) => any
    /** Icon to show before the text in the UI  */
	icon?: string | Vue.Component
    /** Keywords to match the action when searching  */
    keywords?: string[]
    /** Keyboard shortcuts to attach to this action  */
	keybindings?: string[]
    /** Tag to show before the input field after the action is selected */
	tag?: string
    /** Placeholder to show when waiting for user input after the parent action is selected  */
	placeholder?: string
    /** Value to insert into the search field when the action is selected  */
	value?: string
    /** Display a title instead of the input field when the action is selected  */
	childTitle?: string
    /** Child actions to show once the action is selected   */
	childActions?: Action[]
}