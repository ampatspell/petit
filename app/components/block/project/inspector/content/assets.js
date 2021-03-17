import Component from '@glimmer/component';

const type = (_target, key) => {
  return {
    get() {
      return this.args.types?.includes(key);
    }
  };
}

export default class BlockProjectInspectorContentAssetsComponent extends Component {

  @type sprites;
  @type sequences;

}
