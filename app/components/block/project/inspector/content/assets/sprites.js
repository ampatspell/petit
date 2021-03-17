import Component from '@glimmer/component';
import { reads } from "macro-decorators";

export default class BlockProjectInspectorContentAssetsSpritesComponent extends Component {

  @reads('args.model.nodes.identified.sprite') sprites;

}
