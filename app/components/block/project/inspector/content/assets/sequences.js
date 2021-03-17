import Component from '@glimmer/component';
import { reads } from "macro-decorators";

export default class BlockProjectInspectorContentAssetsSequencesComponent extends Component {

  @reads('args.model.nodes.identified.sequence') sequences;

}
