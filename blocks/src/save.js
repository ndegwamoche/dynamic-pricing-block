import { RichText } from '@wordpress/block-editor';

const SaveComponent = ({ attributes }) => {
    // Default to an empty array if `plans` is undefined
    const { plans = [] } = attributes;

    return (
        <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
            {plans.map((plan, planIndex) => (
                <div className="col" key={planIndex}>
                    <div className="card mb-4 rounded-3 shadow-sm">
                        <div className="card-header py-3">
                            <h4 className="my-0 fw-normal">
                                {plan.name}
                            </h4>
                        </div>
                        <div className="card-body">
                            <h1 className="card-title pricing-card-title">
                                {plan.price}
                                <small className="text-muted fw-light">/mo</small>
                            </h1>
                            <ul className="list-unstyled mt-3 mb-4">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex}>
                                        <RichText.Content value={feature} />
                                    </li>
                                ))}
                            </ul>
                            <button type="button" className="w-100 btn btn-lg btn-outline-primary">
                                Sign up
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SaveComponent;
