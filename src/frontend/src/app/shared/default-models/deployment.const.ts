export const defaultDeployment = `{
    "apiVersion": "extensions/v1beta1",
    "kind": "Deployment",
    "metadata": {
        "labels": {}
    },
    "spec": {
        "selector": {
            "matchLabels": {}
        },
        "template": {
            "metadata": {
                "labels": {}
            },
            "spec": {
                "containers": [],
                "volumes": []
            }
        },
        "strategy": {
            "type": "RollingUpdate",
            "rollingUpdate":{
                "maxSurge":"20%",
                "maxUnavailable": 1
            }
        }
    }
}`;
