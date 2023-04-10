import * as Mathjs from "mathjs";

function _nth_power(number, n) {
  let result = 1;
  for (let i = 0; i < n; i++) {
    result *= number;
  }
  return result;
}

function _round_object(obj, precision) {
  for (let key of Object.keys(obj)) {
    obj[key] = Mathjs.format(obj[key], {
      notation: "fixed",
      precision: precision,
    });
  }
  return obj;
}

function sum(data, cache) {
  let sum = 0.0;
  for (let i of data) {
    sum = sum + i;
  }
  return sum;
}

function average(data, cache) {
  return sum(data) / data.length;
}

function SS(data, cache) {
  const avg = average(data);
  return sum(data.map((d) => _nth_power(d - avg, 2)));
}

function sample_standard_deviation(data, cache) {
  return Math.sqrt(SS(data) / (data.length - 1));
}

function population_standard_deviation(data, cache) {
  return Math.sqrt(SS(data) / data.length);
}

function uncertainty_A(data, sigma, cache) {
  if (!sigma) {
    sigma = 1.0;
  }
  return sigma * Math.sqrt(SS(data) / (data.length * (data.length - 1)));
}

function uncertainty(data, uncertaintyB, sigma, cache) {
  console.log(uncertaintyB, sigma);
  if (!uncertaintyB) {
    uncertaintyB = 0;
  }
  if (!sigma) {
    sigma = 1.0;
  }
  return Math.sqrt(
    _nth_power(uncertaintyB, 2) +
      _nth_power(uncertainty_A(data, sigma, cache), 2)
  );
}

function relativeUncertainty(data, uncertainty, cache) {
  return uncertainty / average(data);
}

function compute(data, config) {
  let result = {};
  result.sum = sum(data, result);
  result.average = average(data, result);
  result.SS = SS(data, result);
  result.sample_standard_deviation = sample_standard_deviation(data, result);
  result.population_standard_deviation = population_standard_deviation(
    data,
    result
  );

  if (config.computeUncertainty) {
    result.uncertaintyA = uncertainty_A(data, config.sigma, result);
    result.uncertainty = uncertainty(
      data,
      config.uncertaintyB,
      config.sigma,
      result
    );
    result.relativeUncertainty = relativeUncertainty(
      data,
      result.uncertainty,
      result
    );
    result.relativeUncertaintyInPercent = result.relativeUncertainty / 100;
  }
  if (config.precision !== undefined) {
    result = _round_object(result, config.precision);
  }
  return result;
}

const _exported = {
  sum,
  average,
  SS,
  sample_standard_deviation,
  population_standard_deviation,
  compute,
  uncertainty_A,
  uncertainty,
};

export default _exported;
