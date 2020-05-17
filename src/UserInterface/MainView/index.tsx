import React, { FunctionComponent } from "react";
import { Box, useInput } from "ink";
import Configuration from "../../Configuration";
import CollectionComponent from "./CollectionComponent";
import EnvironmentsComponent from "./EnvironmentsComponent";
import RequestsComponent from "./RequestsComponent";
import SelectedRequestComponent from "./SelectedRequestComponent";
import ResponseComponent from "./ResponseComponent";
import Clients from "../../Clients";
import Collection from "../../Collections/Collection";
import Request from "../../Collections/Request";
import Response from "../../Response";
import Environment from "../../Collections/Environment";

const MainView: FunctionComponent<{
  configuration: Configuration;
  client: string;
  collection?: Collection;
  selectedEnvironment?: Environment;
  selectedRequest?: Request;
  setLastResponse: (response: Response) => void;
  lastResponse?: Response;
}> = ({
  configuration,
  client,
  collection,
  selectedEnvironment,
  selectedRequest,
  lastResponse,
  setLastResponse,
}) => {
  useInput((input) => {
    if (input === configuration.get("keys.send")) {
      if (selectedRequest instanceof Request) {
        Clients.send(client, selectedRequest).then(setLastResponse);
      }
    }
  });
  return (
    <Box width="100%" height="100%" flexDirection="column">
      <Box flexGrow={1}>
        <Box width="45%" flexDirection="column">
          <CollectionComponent name={collection?.name} />
          <Box flexDirection="row" width="100%">
            <EnvironmentsComponent
              environments={collection?.environments}
              selectedEnvironment={selectedEnvironment}
            />
            <RequestsComponent
              requests={collection?.requests}
              selectedRequest={selectedRequest}
            />
          </Box>
        </Box>
        <Box flexGrow={1} flexDirection="column">
          <Box height="50%">
            <SelectedRequestComponent request={selectedRequest} />
          </Box>
          <Box flexGrow={1}>
            <ResponseComponent response={lastResponse} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MainView;