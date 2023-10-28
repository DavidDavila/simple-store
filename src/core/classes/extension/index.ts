import { OrderUIT } from '../events';
import { styles } from './styles.const';
import { TemplatesT, TEMPLATES } from './templates.const';
import { eventInstance } from '../events/index';
class Extension {
  templates: TemplatesT = TEMPLATES;
  json!: { [key: string]: any };
  listeners: string[] = ["beforeunload", "unload"];
  constructor() {
    this.listeners.forEach((windowEvent: string) =>
      this.setListeners(windowEvent)
    );
  }
  setListeners(windowEvent: string) {
    window.addEventListener(windowEvent, () => {
      eventInstance.sendEventUI(OrderUIT.remove);
    });
  }
  /**
   * Devuelve una plantilla HTML de un JSON
   *
   * @param {*} json
   * @returns {*}
   * @memberof Extension
   */
  getHtml(json: any): string {
    this.json = json;
    const container: HTMLDivElement = document.createElement("div");
    const jsonEditorDom: HTMLDivElement = document.createElement("div");
    jsonEditorDom.id = "jsoneditor";
    const stylesDom = document.createElement("style");
    stylesDom.innerHTML = styles;
    jsonEditorDom.innerHTML = this.jsonViewer(json);
    container.appendChild(stylesDom);
    container.appendChild(jsonEditorDom);
    return container.innerHTML;
  }
  jsonViewer(json: any) {
    return this.parseObject(json);
  }
  parseObject(obj: any) {
    let _result = '<div class="json">';

		for (const item in obj) {
			const key = item,
				value = obj[item];

			_result += this.handleItem(key, value);
		}

		_result += '</div>';

		return _result;
	}
	handleItem(key: any, value: any) {
		const type = typeof value;

		if (typeof value === 'object') {
			return this.handleChildren(key, value, type);
		}

		return this.createItem(key, value, type);
	}
	handleChildren(key: any, value: any, type: any) {
		let html = '';

		for (const item in value) {
			const _key = item,
				_val = value[item];

			html += this.handleItem(_key, _val);
		}

		return this.createCollapsibleItem(key, value, type, html);
	}

	// eslint-disable-next-line better-max-params/better-max-params
	createCollapsibleItem(key: any, value: any, type: any, children: any) {
		const element = this.templates.itemCollapsible
			.replace('%KEY%', key)
			.replace('%VALUE%', type)
			.replace('%TYPE%', type)
			.replace('%CHILDREN%', children)
			.replace('%OPEN%', 'checked');

		return element;
	}
	createItem(key: any, value: any, type: any) {
		let element = this.templates.item.replace('%KEY%', key);

		if (type === 'string') {
			element = element.replace('%VALUE%', `"${value}"`);
		} else {
			element = element.replace('%VALUE%', value);
		}

		element = element.replace('%TYPE%', type);

		return element;
	}
}
const instance = new Extension();
export const extensionInstance: Extension = instance;
